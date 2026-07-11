import { t as e } from "./_plugin-vue_export-helper-B3ysoDQm.js";
import { t } from "./Icon-C0x49DFi.js";
import { t as n } from "./useFocusTrap-DZxA3ZEr.js";
import { a as r } from "./usePreferencesStore-g-d6JBr9.js";
import { t as i } from "./useMessages-CI_jngTk.js";
import { i as a, t as o } from "./Kbd-CucML1uh.js";
import { Fragment as s, Teleport as c, Transition as l, computed as u, createBlock as d, createCommentVNode as f, createElementBlock as p, createElementVNode as m, createVNode as h, defineComponent as g, inject as _, normalizeClass as v, onBeforeUnmount as y, onMounted as b, openBlock as x, ref as S, renderList as C, toDisplayString as w, unref as T, useId as E, watch as D, withCtx as O, withModifiers as k } from "vue";
import { useRouter as A } from "vue-router";
//#region src/components/CommandPalette.vue?vue&type=script&setup=true&lang.ts
var ee = ["aria-label"], te = { class: "phlix-cmdk__search" }, j = [
	"value",
	"aria-controls",
	"aria-activedescendant",
	"placeholder"
], M = ["id", "aria-label"], N = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, P = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], F = { class: "phlix-cmdk__option-body" }, I = { class: "phlix-cmdk__option-title" }, L = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, R = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, z = /*#__PURE__*/ e(/* @__PURE__ */ g({
	__name: "CommandPalette",
	setup(e) {
		let g = a(), z = A(), B = r(), { t: V } = i(), H = S(null), U = E(), W = S(0);
		function G(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => g.runId(e.id)
			};
		}
		function K(e) {
			return {
				id: "__search",
				title: V("palette.searchLibrary", { query: e }),
				icon: "search",
				run: () => {
					g.closePalette(), z.push({
						name: "browse",
						query: { search: e }
					});
				}
			};
		}
		let q = u(() => {
			let e = [], t = [], n = (n) => {
				e.push({
					kind: "option",
					item: n,
					index: t.length
				}), t.push(n);
			}, r = g.query.trim();
			if (r) {
				for (let e of g.results) n(G(e));
				return n(K(r)), {
					rows: e,
					options: t
				};
			}
			let i = g.results.filter((e) => g.isRecent(e.id));
			i.length && (e.push({
				kind: "header",
				label: V("palette.recent")
			}), i.forEach((e) => n(G(e))));
			let a = /* @__PURE__ */ new Map();
			for (let e of g.results) {
				if (g.isRecent(e.id)) continue;
				let t = e.group ?? V("palette.commands"), n = a.get(t);
				n ? n.push(e) : a.set(t, [e]);
			}
			for (let [t, r] of a) e.push({
				kind: "header",
				label: t
			}), r.forEach((e) => n(G(e)));
			return {
				rows: e,
				options: t
			};
		}), J = u(() => q.value.options.length), Y = u(() => J.value ? `${U}-opt-${W.value}` : void 0);
		D(() => g.query, () => {
			W.value = 0;
		}), D(J, (e) => {
			W.value > e - 1 && (W.value = Math.max(0, e - 1));
		}), D(() => g.open, (e) => {
			e && (W.value = 0);
		});
		function X() {
			typeof document > "u" || document.getElementById(`${U}-opt-${W.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function Z(e) {
			let t = J.value;
			t && (W.value = (W.value + e + t) % t, X());
		}
		function ne() {
			let e = q.value.options[W.value];
			e && e.run();
		}
		function re(e) {
			e.run();
		}
		function Q(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), Z(1);
					break;
				case "ArrowUp":
					e.preventDefault(), Z(-1);
					break;
				case "Home":
					e.preventDefault(), W.value = 0, X();
					break;
				case "End":
					e.preventDefault(), W.value = Math.max(0, J.value - 1), X();
					break;
				case "Enter":
					e.preventDefault(), ne();
					break;
			}
		}
		function ie() {
			g.closePalette();
		}
		n(H, u(() => g.open), { onEscape: () => (g.closePalette(), !0) });
		let ae = _("phlixCommands", []), oe = [
			{
				id: "nav.browse",
				title: V("palette.goToBrowse"),
				icon: "film",
				group: V("palette.groupNavigation"),
				keywords: [
					"home",
					"library",
					"media"
				],
				priority: 0,
				run: () => {
					z.push({ name: "browse" });
				}
			},
			{
				id: "nav.settings",
				title: V("palette.goToSettings"),
				icon: "settings",
				group: V("palette.groupNavigation"),
				keywords: [
					"preferences",
					"config",
					"options"
				],
				priority: 1,
				run: () => {
					z.push({ name: "settings" });
				}
			},
			{
				id: "theme.nocturne",
				title: V("palette.themeNocturne"),
				icon: "moon",
				group: V("palette.groupTheme"),
				keywords: [
					"dark",
					"amber",
					"cinema"
				],
				run: () => {
					B.theme = "nocturne";
				}
			},
			{
				id: "theme.daylight",
				title: V("palette.themeDaylight"),
				icon: "sun",
				group: V("palette.groupTheme"),
				keywords: ["light", "bright"],
				run: () => {
					B.theme = "daylight";
				}
			},
			{
				id: "theme.midnight",
				title: V("palette.themeMidnight"),
				icon: "monitor",
				group: V("palette.groupTheme"),
				keywords: [
					"oled",
					"black",
					"contrast"
				],
				run: () => {
					B.theme = "midnight";
				}
			},
			{
				id: "pref.density",
				title: V("palette.toggleDensity"),
				icon: "list",
				group: V("palette.groupPreferences"),
				keywords: [
					"compact",
					"comfortable",
					"spacing"
				],
				run: () => {
					B.density = B.density === "compact" ? "comfortable" : "compact";
				}
			},
			{
				id: "pref.motion",
				title: V("palette.toggleReducedMotion"),
				icon: "speed",
				group: V("palette.groupPreferences"),
				keywords: [
					"animation",
					"accessibility",
					"a11y"
				],
				run: () => {
					B.reducedMotion = B.reducedMotion === "off" ? "auto" : "off";
				}
			},
			{
				id: "pref.atmosphere",
				title: V("palette.toggleAtmosphere"),
				icon: "star",
				group: V("palette.groupPreferences"),
				keywords: [
					"grain",
					"vignette",
					"glow",
					"ambient"
				],
				run: () => {
					B.atmosphere = !B.atmosphere;
				}
			},
			{
				id: "pref.reset",
				title: V("palette.resetPreferences"),
				icon: "rewind",
				group: V("palette.groupPreferences"),
				keywords: [
					"default",
					"clear",
					"restore"
				],
				run: () => B.reset()
			}
		], $ = null;
		return b(() => {
			$ = g.register([...oe, ...ae]);
		}), y(() => {
			$?.();
		}), (e, n) => (x(), d(c, { to: "body" }, [h(l, { name: "phlix-cmdk" }, {
			default: O(() => [T(g).open ? (x(), p("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: k(ie, ["self"])
			}, [m("div", {
				ref_key: "panelEl",
				ref: H,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": T(V)("palette.title")
			}, [m("div", te, [
				h(t, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				m("input", {
					value: T(g).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": T(U),
					"aria-activedescendant": Y.value,
					"aria-autocomplete": "list",
					placeholder: T(V)("palette.placeholder"),
					autocomplete: "off",
					spellcheck: "false",
					onInput: n[0] ||= (e) => T(g).setQuery(e.target.value),
					onKeydown: Q
				}, null, 40, j),
				h(o, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), m("ul", {
				id: T(U),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": T(V)("palette.commands")
			}, [(x(!0), p(s, null, C(q.value.rows, (e, n) => (x(), p(s, { key: e.kind === "header" ? `h-${e.label}-${n}` : e.item.id }, [e.kind === "header" ? (x(), p("li", N, w(e.label), 1)) : (x(), p("li", {
				key: 1,
				id: `${T(U)}-opt-${e.index}`,
				class: v(["phlix-cmdk__option", { "is-active": e.index === W.value }]),
				role: "option",
				"aria-selected": e.index === W.value,
				onClick: (t) => re(e.item),
				onPointermove: (t) => W.value = e.index
			}, [
				h(t, {
					name: e.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				m("span", F, [m("span", I, w(e.item.title), 1), e.item.subtitle ? (x(), p("span", L, w(e.item.subtitle), 1)) : f("", !0)]),
				e.item.shortcut ? (x(), d(o, {
					key: 0,
					keys: e.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : f("", !0)
			], 42, P))], 64))), 128)), J.value ? f("", !0) : (x(), p("li", R, w(T(V)("palette.noResults")), 1))], 8, M)], 8, ee)], 32)) : f("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-2bdf42f1"]]);
//#endregion
export { z as default };

//# sourceMappingURL=CommandPalette-DKv9qBkh.js.map