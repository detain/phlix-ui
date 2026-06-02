import { Fragment as e, Teleport as t, Transition as n, TransitionGroup as r, computed as i, createApp as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, createStaticVNode as u, createTextVNode as d, createVNode as f, defineComponent as p, inject as m, markRaw as h, nextTick as g, normalizeClass as _, normalizeStyle as v, onBeforeUnmount as y, onMounted as b, onUnmounted as x, openBlock as S, reactive as C, ref as w, renderList as T, renderSlot as E, resolveComponent as D, resolveDynamicComponent as O, toDisplayString as k, unref as A, useId as j, vModelDynamic as M, vModelText as N, vShow as P, watch as F, watchEffect as I, withCtx as L, withDirectives as R, withKeys as z, withModifiers as B } from "vue";
import { createPinia as V, defineStore as H } from "pinia";
import { RouterLink as U, RouterView as ee, createRouter as te, createWebHistory as W, useRoute as G, useRouter as K } from "vue-router";
//#region \0plugin-vue:export-helper
var q = (e, t) => {
	let n = e.__vccOpts || e;
	for (let [e, r] of t) n[e] = r;
	return n;
}, ne = {}, re = { class: "app-layout" }, ie = { class: "app-header" }, ae = { class: "header-inner" }, oe = { class: "logo" }, se = { class: "nav" }, ce = { class: "app-main" }, le = { class: "app-footer" };
function ue(e, t) {
	return S(), c("div", re, [
		l("header", ie, [l("div", ae, [l("div", oe, [E(e.$slots, "logo", {}, () => [t[0] ||= l("span", { class: "logo-text" }, "Phlix", -1)], !0)]), l("nav", se, [E(e.$slots, "nav", {}, void 0, !0)])])]),
		l("main", ce, [E(e.$slots, "default", {}, void 0, !0)]),
		l("footer", le, [E(e.$slots, "footer", {}, void 0, !0)])
	]);
}
var de = /*#__PURE__*/ q(ne, [["render", ue], ["__scopeId", "data-v-9f6c6d16"]]), fe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pe(e, t) {
	return S(), c("svg", fe, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var me = h({
	name: "lucide-play",
	render: pe
}), he = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ge(e, t) {
	return S(), c("svg", he, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), l("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var _e = h({
	name: "lucide-pause",
	render: ge
}), ve = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ye(e, t) {
	return S(), c("svg", ve, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var be = h({
	name: "lucide-skip-back",
	render: ye
}), xe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Se(e, t) {
	return S(), c("svg", xe, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var Ce = h({
	name: "lucide-skip-forward",
	render: Se
}), we = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Te(e, t) {
	return S(), c("svg", we, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), l("path", { d: "M3 3v5h5" })], -1)]]);
}
var Ee = h({
	name: "lucide-rotate-ccw",
	render: Te
}), De = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Oe(e, t) {
	return S(), c("svg", De, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), l("path", { d: "M21 3v5h-5" })], -1)]]);
}
var ke = h({
	name: "lucide-rotate-cw",
	render: Oe
}), Ae = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function je(e, t) {
	return S(), c("svg", Ae, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var Me = h({
	name: "lucide-volume-2",
	render: je
}), Ne = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pe(e, t) {
	return S(), c("svg", Ne, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var Fe = h({
	name: "lucide-volume-1",
	render: Pe
}), Ie = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Le(e, t) {
	return S(), c("svg", Ie, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var Re = h({
	name: "lucide-volume-x",
	render: Le
}), ze = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Be(e, t) {
	return S(), c("svg", ze, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), l("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var Ve = h({
	name: "lucide-captions",
	render: Be
}), He = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ue(e, t) {
	return S(), c("svg", He, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), l("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var We = h({
	name: "lucide-picture-in-picture-2",
	render: Ue
}), Ge = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ke(e, t) {
	return S(), c("svg", Ge, [...t[0] ||= [l("rect", {
		width: "20",
		height: "12",
		x: "2",
		y: "6",
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		rx: "2"
	}, null, -1)]]);
}
var qe = h({
	name: "lucide-rectangle-horizontal",
	render: Ke
}), Je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ye(e, t) {
	return S(), c("svg", Je, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var Xe = h({
	name: "lucide-maximize",
	render: Ye
}), Ze = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qe(e, t) {
	return S(), c("svg", Ze, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var $e = h({
	name: "lucide-minimize",
	render: Qe
}), et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tt(e, t) {
	return S(), c("svg", et, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var nt = h({
	name: "lucide-maximize-2",
	render: tt
}), rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function it(e, t) {
	return S(), c("svg", rt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var at = h({
	name: "lucide-cast",
	render: it
}), ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function st(e, t) {
	return S(), c("svg", ot, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), l("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var ct = h({
	name: "lucide-settings",
	render: st
}), lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ut(e, t) {
	return S(), c("svg", lt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var dt = h({
	name: "lucide-gauge",
	render: ut
}), ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pt(e, t) {
	return S(), c("svg", ft, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), l("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var mt = h({
	name: "lucide-film",
	render: pt
}), ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gt(e, t) {
	return S(), c("svg", ht, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		l("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		l("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var _t = h({
	name: "lucide-image",
	render: gt
}), vt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yt(e, t) {
	return S(), c("svg", vt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("path", { d: "M9 18V5l12-2v13" }),
		l("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		l("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var bt = h({
	name: "lucide-music",
	render: yt
}), xt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function St(e, t) {
	return S(), c("svg", xt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "m17 2l-5 5l-5-5" }), l("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var Ct = h({
	name: "lucide-tv",
	render: St
}), wt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tt(e, t) {
	return S(), c("svg", wt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "m21 21l-4.34-4.34" }), l("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var Et = h({
	name: "lucide-search",
	render: Tt
}), Dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ot(e, t) {
	return S(), c("svg", Dt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var kt = h({
	name: "lucide-sliders-horizontal",
	render: Ot
}), At = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jt(e, t) {
	return S(), c("svg", At, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("path", { d: "M8 2v4m8-4v4" }),
		l("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		l("path", { d: "M3 10h18" })
	], -1)]]);
}
var Mt = h({
	name: "lucide-calendar",
	render: jt
}), Nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pt(e, t) {
	return S(), c("svg", Nt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Ft = h({
	name: "lucide-arrow-up-down",
	render: Pt
}), It = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Lt(e, t) {
	return S(), c("svg", It, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var Rt = h({
	name: "lucide-star",
	render: Lt
}), zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bt(e, t) {
	return S(), c("svg", zt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var Vt = h({
	name: "lucide-list",
	render: Bt
}), Ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ut(e, t) {
	return S(), c("svg", Ht, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var Wt = h({
	name: "lucide-plus",
	render: Ut
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return S(), c("svg", Gt, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var qt = h({
	name: "lucide-info",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return S(), c("svg", Jt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Xt = h({
	name: "lucide-x",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qt(e, t) {
	return S(), c("svg", Zt, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var $t = h({
	name: "lucide-check",
	render: Qt
}), en = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tn(e, t) {
	return S(), c("svg", en, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var nn = h({
	name: "lucide-bookmark",
	render: tn
}), rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function an(e, t) {
	return S(), c("svg", rn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var on = h({
	name: "lucide-bookmark-plus",
	render: an
}), sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cn(e, t) {
	return S(), c("svg", sn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var ln = h({
	name: "lucide-heart",
	render: cn
}), un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dn(e, t) {
	return S(), c("svg", un, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), l("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var fn = h({
	name: "lucide-user",
	render: dn
}), pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mn(e, t) {
	return S(), c("svg", pn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var hn = h({
	name: "lucide-log-out",
	render: mn
}), gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _n(e, t) {
	return S(), c("svg", gn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var vn = h({
	name: "lucide-menu",
	render: _n
}), yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bn(e, t) {
	return S(), c("svg", yn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		l("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		l("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		l("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var xn = h({
	name: "lucide-more-horizontal",
	render: bn
}), Sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cn(e, t) {
	return S(), c("svg", Sn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), l("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var wn = h({
	name: "lucide-eye",
	render: Cn
}), Tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function En(e, t) {
	return S(), c("svg", Tn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), l("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Dn = h({
	name: "lucide-eye-off",
	render: En
}), On = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kn(e, t) {
	return S(), c("svg", On, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var An = h({
	name: "lucide-arrow-left",
	render: kn
}), jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mn(e, t) {
	return S(), c("svg", jn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var Nn = h({
	name: "lucide-arrow-up",
	render: Mn
}), Pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fn(e, t) {
	return S(), c("svg", Pn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var In = h({
	name: "lucide-arrow-down",
	render: Fn
}), Ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rn(e, t) {
	return S(), c("svg", Ln, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var zn = h({
	name: "lucide-chevron-down",
	render: Rn
}), Bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vn(e, t) {
	return S(), c("svg", Bn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var Hn = h({
	name: "lucide-chevron-up",
	render: Vn
}), Un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wn(e, t) {
	return S(), c("svg", Un, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Gn = h({
	name: "lucide-chevron-left",
	render: Wn
}), Kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qn(e, t) {
	return S(), c("svg", Kn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Jn = h({
	name: "lucide-chevron-right",
	render: qn
}), Yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xn(e, t) {
	return S(), c("svg", Yn, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Zn = h({
	name: "lucide-loader-circle",
	render: Xn
}), Qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $n(e, t) {
	return S(), c("svg", Qn, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var er = h({
	name: "lucide-circle-alert",
	render: $n
}), tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nr(e, t) {
	return S(), c("svg", tr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var rr = h({
	name: "lucide-circle-check",
	render: nr
}), ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ar(e, t) {
	return S(), c("svg", ir, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), l("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var or = h({
	name: "lucide-circle-x",
	render: ar
}), sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cr(e, t) {
	return S(), c("svg", sr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), l("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var lr = h({
	name: "lucide-sun",
	render: cr
}), ur = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dr(e, t) {
	return S(), c("svg", ur, [...t[0] ||= [l("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var fr = h({
	name: "lucide-moon",
	render: dr
}), pr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mr(e, t) {
	return S(), c("svg", pr, [...t[0] ||= [l("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [l("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), l("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var hr = h({
	name: "lucide-monitor",
	render: mr
}), J = /* @__PURE__ */ p({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(e) {
		let t = {
			play: me,
			pause: _e,
			"skip-back": be,
			"skip-forward": Ce,
			rewind: Ee,
			forward: ke,
			volume: Me,
			"volume-low": Fe,
			mute: Re,
			captions: Ve,
			pip: We,
			theater: qe,
			fullscreen: Xe,
			"fullscreen-exit": $e,
			expand: nt,
			cast: at,
			settings: ct,
			speed: dt,
			film: mt,
			image: _t,
			music: bt,
			tv: Ct,
			search: Et,
			filter: kt,
			calendar: Mt,
			sort: Ft,
			star: Rt,
			list: Vt,
			plus: Wt,
			info: qt,
			x: Xt,
			check: $t,
			bookmark: nn,
			"bookmark-plus": on,
			heart: ln,
			user: fn,
			"log-out": hn,
			menu: vn,
			more: xn,
			eye: wn,
			"eye-off": Dn,
			"arrow-left": An,
			"arrow-up": Nn,
			"arrow-down": In,
			"chevron-down": zn,
			"chevron-up": Hn,
			"chevron-left": Gn,
			"chevron-right": Jn,
			spinner: Zn,
			alert: er,
			success: rr,
			error: or,
			sun: lr,
			moon: fr,
			monitor: hr
		}, n = e, r = i(() => t[n.name]), a = i(() => n.size === void 0 ? void 0 : typeof n.size == "number" ? `${n.size}px` : n.size);
		return (t, n) => (S(), o(O(r.value), {
			class: "phlix-icon",
			style: v(a.value ? { fontSize: a.value } : void 0),
			"stroke-width": e.strokeWidth,
			role: e.label ? "img" : void 0,
			"aria-label": e.label,
			"aria-hidden": e.label ? void 0 : "true",
			focusable: "false"
		}, null, 8, [
			"style",
			"stroke-width",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
}), gr = [
	"type",
	"disabled",
	"aria-label",
	"title",
	"aria-pressed",
	"aria-busy"
], _r = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "IconButton",
	props: {
		name: {},
		label: {},
		variant: { default: "ghost" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		pressed: {
			type: Boolean,
			default: void 0
		}
	},
	setup(e) {
		let t = e, n = i(() => t.disabled || t.loading);
		return (t, r) => (S(), c("button", {
			type: e.type,
			class: _(["phlix-iconbtn", [
				`phlix-iconbtn--${e.variant}`,
				`phlix-iconbtn--${e.size}`,
				{ "is-pressed": e.pressed }
			]]),
			disabled: n.value,
			"aria-label": e.label,
			title: e.label,
			"aria-pressed": e.pressed === void 0 ? void 0 : e.pressed,
			"aria-busy": e.loading || void 0
		}, [f(J, {
			name: e.loading ? "spinner" : e.name,
			class: _({ "phlix-iconbtn__spin": e.loading })
		}, null, 8, ["name", "class"])], 10, gr));
	}
}), [["__scopeId", "data-v-fc0cd545"]]), vr = { class: "phlix-kbd" }, yr = {
	key: 1,
	class: "phlix-kbd__key"
}, br = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Kbd",
	props: { keys: {} },
	setup(t) {
		let n = t, r = i(() => n.keys === void 0 ? [] : Array.isArray(n.keys) ? n.keys : [n.keys]);
		return (t, n) => (S(), c("span", vr, [r.value.length ? (S(!0), c(e, { key: 0 }, T(r.value, (e, t) => (S(), c("kbd", {
			key: t,
			class: "phlix-kbd__key"
		}, k(e), 1))), 128)) : (S(), c("kbd", yr, [E(t.$slots, "default", {}, void 0, !0)]))]));
	}
}), [["__scopeId", "data-v-5e5c4a8a"]]), xr = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex=\"-1\"])"
].join(","), Sr = 0, Cr = "";
function wr() {
	Sr === 0 && (Cr = document.body.style.overflow, document.body.style.overflow = "hidden"), Sr++;
}
function Tr() {
	Sr !== 0 && (Sr--, Sr === 0 && (document.body.style.overflow = Cr));
}
function Er(e, t, n = {}) {
	let r = n.lockScroll ?? !0, i = null, a = !1;
	function o() {
		let t = e.value;
		return t ? Array.from(t.querySelectorAll(xr)).filter((e) => !e.hasAttribute("hidden") && e.getAttribute("aria-hidden") !== "true") : [];
	}
	function s(r) {
		if (!t.value || !e.value) return;
		if (r.key === "Escape") {
			n.onEscape?.() && r.preventDefault();
			return;
		}
		if (r.key !== "Tab") return;
		let i = o();
		if (i.length === 0) {
			r.preventDefault(), e.value.focus();
			return;
		}
		let a = i[0], s = i[i.length - 1], c = document.activeElement;
		e.value.contains(c) ? r.shiftKey && c === a ? (r.preventDefault(), s.focus()) : !r.shiftKey && c === s && (r.preventDefault(), a.focus()) : (r.preventDefault(), a.focus());
	}
	function c() {
		i = document.activeElement, r && (wr(), a = !0), document.addEventListener("keydown", s, !0), g(() => {
			(o()[0] ?? e.value)?.focus();
		});
	}
	function l() {
		document.removeEventListener("keydown", s, !0), a &&= (Tr(), !1), i && document.contains(i) && i.focus?.(), i = null;
	}
	F(t, (e) => e ? c() : l(), { immediate: !0 }), y(() => {
		document.removeEventListener("keydown", s, !0), a &&= (Tr(), !1);
	});
}
//#endregion
//#region src/stores/useCommandStore.ts
var Dr = "phlix.cmd.recents", Or = 8;
function kr(e, t) {
	let n = e.toLowerCase(), r = t.toLowerCase();
	if (n.length === 0) return 0;
	if (n.length > r.length) return -1;
	let i = 0, a = 0, o = -2, s = 0;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], c = -1;
		for (let e = a; e < r.length; e++) if (r[e] === t) {
			c = e;
			break;
		}
		if (c === -1) return -1;
		i += 1, c === o + 1 ? (s++, i += 5 + s * 2) : s = 0;
		let l = c === 0 ? "" : r[c - 1];
		if ((c === 0 || l === " " || l === "-" || l === "/" || l === ":") && (i += 8), o >= 0) {
			let e = c - o - 1;
			e > 0 && (i -= Math.min(e, 4));
		}
		o = c, a = c + 1;
	}
	return r.startsWith(n) && (i += 15), i;
}
function Ar(e, t) {
	if (!e.trim()) return 0;
	let n = kr(e, t.title), r = n >= 0 ? n + 3 : -1;
	for (let n of t.keywords ?? []) r = Math.max(r, kr(e, n));
	return t.group && (r = Math.max(r, kr(e, t.group))), r;
}
function jr() {
	if (typeof localStorage > "u") return [];
	try {
		let e = localStorage.getItem(Dr);
		if (!e) return [];
		let t = JSON.parse(e);
		return Array.isArray(t) ? t.filter((e) => typeof e == "string").slice(0, Or) : [];
	} catch {
		return [];
	}
}
var Mr = H("phlix-commands", () => {
	let e = w(/* @__PURE__ */ new Map()), t = w(!1), n = w(""), r = w(jr()), a = i(() => Array.from(e.value.values())), o = i(() => {
		let t = n.value.trim(), i = a.value;
		if (t) return i.map((e) => ({
			c: e,
			s: Ar(t, e)
		})).filter((e) => e.s >= 0).sort((e, t) => t.s - e.s || (e.c.priority ?? 0) - (t.c.priority ?? 0) || e.c.title.localeCompare(t.c.title)).map((e) => e.c);
		let o = r.value.map((t) => e.value.get(t)).filter((e) => !!e), s = new Set(o.map((e) => e.id)), c = i.filter((e) => !s.has(e.id)).sort((e, t) => (e.priority ?? 0) - (t.priority ?? 0) || e.title.localeCompare(t.title));
		return [...o, ...c];
	});
	function s(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.set(e.id, e);
		return e.value = r, () => c(n.map((e) => e.id));
	}
	function c(t) {
		let n = Array.isArray(t) ? t : [t], r = new Map(e.value);
		for (let e of n) r.delete(e);
		e.value = r;
	}
	function l(e) {
		return r.value.includes(e);
	}
	function u(e) {
		r.value = [e, ...r.value.filter((t) => t !== e)].slice(0, Or);
	}
	function d() {
		r.value = [];
	}
	function f(e) {
		n.value = e;
	}
	function p() {
		n.value = "", t.value = !0;
	}
	function m() {
		t.value = !1;
	}
	function h() {
		t.value ? m() : p();
	}
	async function g(t) {
		let n = e.value.get(t);
		n && (u(t), m(), await n.run());
	}
	return F(r, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Dr, JSON.stringify(e));
		} catch {}
	}, { deep: !0 }), {
		registry: e,
		open: t,
		query: n,
		recentIds: r,
		all: a,
		results: o,
		register: s,
		unregister: c,
		isRecent: l,
		pushRecent: u,
		clearRecents: d,
		setQuery: f,
		openPalette: p,
		closePalette: m,
		togglePalette: h,
		runId: g
	};
}), Nr = {
	theme: "nocturne",
	accent: null,
	density: "comfortable",
	cardSize: 180,
	gridDensity: "comfy",
	reducedMotion: "auto",
	autoplay: !0,
	defaultVolume: 1,
	defaultQuality: "auto",
	defaultSubtitleLang: null,
	atmosphere: !0,
	filterPresets: []
};
function Pr(e) {
	return e.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "preset";
}
var Fr = "phlix.prefs";
function Ir() {
	if (typeof localStorage > "u") return { ...Nr };
	try {
		let e = localStorage.getItem(Fr);
		if (!e) return { ...Nr };
		let t = JSON.parse(e);
		return {
			...Nr,
			...t
		};
	} catch {
		return { ...Nr };
	}
}
function Lr() {
	if (typeof localStorage > "u") return !1;
	try {
		return localStorage.getItem(Fr) !== null;
	} catch {
		return !1;
	}
}
function Rr() {
	return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
var Y = H("phlix-prefs", () => {
	let e = Ir(), t = w(e.theme), n = w(e.accent), r = w(e.density), a = w(e.cardSize), o = w(e.gridDensity), s = w(e.reducedMotion), c = w(e.autoplay), l = w(e.defaultVolume), u = w(e.defaultQuality), d = w(e.defaultSubtitleLang), f = w(e.atmosphere), p = w(e.filterPresets ? [...e.filterPresets] : []), m = w(Rr()), h = null;
	typeof window < "u" && typeof window.matchMedia == "function" && (h = window.matchMedia("(prefers-reduced-motion: reduce)"), h.addEventListener?.("change", (e) => m.value = e.matches));
	let g = i(() => s.value === "on" ? !0 : s.value === "off" ? !1 : m.value);
	function _() {
		return {
			theme: t.value,
			accent: n.value,
			density: r.value,
			cardSize: a.value,
			gridDensity: o.value,
			reducedMotion: s.value,
			autoplay: c.value,
			defaultVolume: l.value,
			defaultQuality: u.value,
			defaultSubtitleLang: d.value,
			atmosphere: f.value,
			filterPresets: p.value
		};
	}
	function v(e, t) {
		let n = {
			id: Pr(e),
			name: e.trim(),
			query: t
		}, r = p.value.findIndex((e) => e.id === n.id);
		return r >= 0 ? p.value.splice(r, 1, n) : p.value.push(n), n;
	}
	function y(e) {
		p.value = p.value.filter((t) => t.id !== e);
	}
	F(_, (e) => {
		if (!(typeof localStorage > "u")) try {
			localStorage.setItem(Fr, JSON.stringify(e));
		} catch {}
	}, { deep: !0 });
	function b() {
		let e = Nr;
		t.value = e.theme, n.value = e.accent, r.value = e.density, a.value = e.cardSize, o.value = e.gridDensity, s.value = e.reducedMotion, c.value = e.autoplay, l.value = e.defaultVolume, u.value = e.defaultQuality, d.value = e.defaultSubtitleLang, f.value = e.atmosphere, p.value = [...e.filterPresets];
	}
	return {
		theme: t,
		accent: n,
		density: r,
		cardSize: a,
		gridDensity: o,
		reducedMotion: s,
		autoplay: c,
		defaultVolume: l,
		defaultQuality: u,
		defaultSubtitleLang: d,
		atmosphere: f,
		filterPresets: p,
		systemReduced: m,
		effectiveReducedMotion: g,
		snapshot: _,
		saveFilterPreset: v,
		removeFilterPreset: y,
		reset: b
	};
}), zr = { class: "phlix-cmdk__search" }, Br = [
	"value",
	"aria-controls",
	"aria-activedescendant"
], Vr = ["id"], Hr = {
	key: 0,
	class: "phlix-cmdk__group",
	role: "presentation"
}, Ur = [
	"id",
	"aria-selected",
	"onClick",
	"onPointermove"
], Wr = { class: "phlix-cmdk__option-body" }, Gr = { class: "phlix-cmdk__option-title" }, Kr = {
	key: 0,
	class: "phlix-cmdk__option-subtitle"
}, qr = {
	key: 0,
	class: "phlix-cmdk__empty",
	role: "status",
	"aria-live": "polite"
}, Jr = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "CommandPalette",
	setup(r) {
		let a = Mr(), u = K(), d = Y(), p = w(null), h = j(), g = w(0);
		function v(e) {
			return {
				id: e.id,
				title: e.title,
				subtitle: e.subtitle,
				icon: e.icon,
				shortcut: e.shortcut,
				run: () => a.runId(e.id)
			};
		}
		function x(e) {
			return {
				id: "__search",
				title: `Search library for “${e}”`,
				icon: "search",
				run: () => {
					a.closePalette(), u.push({
						name: "browse",
						query: { search: e }
					});
				}
			};
		}
		let C = i(() => {
			let e = [], t = [], n = (n) => {
				e.push({
					kind: "option",
					item: n,
					index: t.length
				}), t.push(n);
			}, r = a.query.trim();
			if (r) {
				for (let e of a.results) n(v(e));
				return n(x(r)), {
					rows: e,
					options: t
				};
			}
			let i = a.results.filter((e) => a.isRecent(e.id));
			i.length && (e.push({
				kind: "header",
				label: "Recent"
			}), i.forEach((e) => n(v(e))));
			let o = /* @__PURE__ */ new Map();
			for (let e of a.results) {
				if (a.isRecent(e.id)) continue;
				let t = e.group ?? "Commands", n = o.get(t);
				n ? n.push(e) : o.set(t, [e]);
			}
			for (let [t, r] of o) e.push({
				kind: "header",
				label: t
			}), r.forEach((e) => n(v(e)));
			return {
				rows: e,
				options: t
			};
		}), E = i(() => C.value.options.length), D = i(() => E.value ? `${h}-opt-${g.value}` : void 0);
		F(() => a.query, () => {
			g.value = 0;
		}), F(E, (e) => {
			g.value > e - 1 && (g.value = Math.max(0, e - 1));
		}), F(() => a.open, (e) => {
			e && (g.value = 0);
		});
		function O() {
			typeof document > "u" || document.getElementById(`${h}-opt-${g.value}`)?.scrollIntoView?.({ block: "nearest" });
		}
		function M(e) {
			let t = E.value;
			t && (g.value = (g.value + e + t) % t, O());
		}
		function N() {
			let e = C.value.options[g.value];
			e && e.run();
		}
		function P(e) {
			e.run();
		}
		function I(e) {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), M(1);
					break;
				case "ArrowUp":
					e.preventDefault(), M(-1);
					break;
				case "Home":
					e.preventDefault(), g.value = 0, O();
					break;
				case "End":
					e.preventDefault(), g.value = Math.max(0, E.value - 1), O();
					break;
				case "Enter":
					e.preventDefault(), N();
					break;
			}
		}
		function R() {
			a.closePalette();
		}
		Er(p, i(() => a.open), { onEscape: () => (a.closePalette(), !0) });
		function z(e) {
			(e.metaKey || e.ctrlKey) && !e.altKey && (e.key === "k" || e.key === "K") && (e.preventDefault(), a.togglePalette());
		}
		let V = m("phlixCommands", []), H = [
			{
				id: "nav.browse",
				title: "Go to Browse",
				icon: "film",
				group: "Navigation",
				keywords: [
					"home",
					"library",
					"media"
				],
				priority: 0,
				run: () => {
					u.push({ name: "browse" });
				}
			},
			{
				id: "nav.settings",
				title: "Go to Settings",
				icon: "settings",
				group: "Navigation",
				keywords: [
					"preferences",
					"config",
					"options"
				],
				priority: 1,
				run: () => {
					u.push({ name: "settings" });
				}
			},
			{
				id: "theme.nocturne",
				title: "Theme: Nocturne",
				icon: "moon",
				group: "Theme",
				keywords: [
					"dark",
					"amber",
					"cinema"
				],
				run: () => {
					d.theme = "nocturne";
				}
			},
			{
				id: "theme.daylight",
				title: "Theme: Daylight",
				icon: "sun",
				group: "Theme",
				keywords: ["light", "bright"],
				run: () => {
					d.theme = "daylight";
				}
			},
			{
				id: "theme.midnight",
				title: "Theme: Midnight",
				icon: "monitor",
				group: "Theme",
				keywords: [
					"oled",
					"black",
					"contrast"
				],
				run: () => {
					d.theme = "midnight";
				}
			},
			{
				id: "pref.density",
				title: "Toggle density",
				icon: "list",
				group: "Preferences",
				keywords: [
					"compact",
					"comfortable",
					"spacing"
				],
				run: () => {
					d.density = d.density === "compact" ? "comfortable" : "compact";
				}
			},
			{
				id: "pref.motion",
				title: "Toggle reduced motion",
				icon: "speed",
				group: "Preferences",
				keywords: [
					"animation",
					"accessibility",
					"a11y"
				],
				run: () => {
					d.reducedMotion = d.reducedMotion === "off" ? "auto" : "off";
				}
			},
			{
				id: "pref.atmosphere",
				title: "Toggle atmosphere",
				icon: "star",
				group: "Preferences",
				keywords: [
					"grain",
					"vignette",
					"glow",
					"ambient"
				],
				run: () => {
					d.atmosphere = !d.atmosphere;
				}
			},
			{
				id: "pref.reset",
				title: "Reset preferences",
				icon: "rewind",
				group: "Preferences",
				keywords: [
					"default",
					"clear",
					"restore"
				],
				run: () => d.reset()
			}
		], U = null;
		return b(() => {
			U = a.register([...H, ...V]), document.addEventListener("keydown", z);
		}), y(() => {
			U?.(), document.removeEventListener("keydown", z);
		}), (r, i) => (S(), o(t, { to: "body" }, [f(n, { name: "phlix-cmdk" }, {
			default: L(() => [A(a).open ? (S(), c("div", {
				key: 0,
				class: "phlix-cmdk",
				onPointerdown: B(R, ["self"])
			}, [l("div", {
				ref_key: "panelEl",
				ref: p,
				class: "phlix-cmdk__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Command palette"
			}, [l("div", zr, [
				f(J, {
					name: "search",
					class: "phlix-cmdk__search-icon"
				}),
				l("input", {
					value: A(a).query,
					class: "phlix-cmdk__input",
					type: "text",
					role: "combobox",
					"aria-expanded": "true",
					"aria-controls": A(h),
					"aria-activedescendant": D.value,
					"aria-autocomplete": "list",
					placeholder: "Type a command or search…",
					autocomplete: "off",
					spellcheck: "false",
					onInput: i[0] ||= (e) => A(a).setQuery(e.target.value),
					onKeydown: I
				}, null, 40, Br),
				f(br, {
					keys: "Esc",
					class: "phlix-cmdk__hint"
				})
			]), l("ul", {
				id: A(h),
				class: "phlix-cmdk__list",
				role: "listbox",
				"aria-label": "Commands"
			}, [(S(!0), c(e, null, T(C.value.rows, (t, n) => (S(), c(e, { key: t.kind === "header" ? `h-${t.label}-${n}` : t.item.id }, [t.kind === "header" ? (S(), c("li", Hr, k(t.label), 1)) : (S(), c("li", {
				key: 1,
				id: `${A(h)}-opt-${t.index}`,
				class: _(["phlix-cmdk__option", { "is-active": t.index === g.value }]),
				role: "option",
				"aria-selected": t.index === g.value,
				onClick: (e) => P(t.item),
				onPointermove: (e) => g.value = t.index
			}, [
				f(J, {
					name: t.item.icon ?? "list",
					class: "phlix-cmdk__option-icon"
				}, null, 8, ["name"]),
				l("span", Wr, [l("span", Gr, k(t.item.title), 1), t.item.subtitle ? (S(), c("span", Kr, k(t.item.subtitle), 1)) : s("", !0)]),
				t.item.shortcut ? (S(), o(br, {
					key: 0,
					keys: t.item.shortcut,
					class: "phlix-cmdk__option-kbd"
				}, null, 8, ["keys"])) : s("", !0)
			], 42, Ur))], 64))), 128)), E.value ? s("", !0) : (S(), c("li", qr, " No matching commands "))], 8, Vr)], 512)], 32)) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-bd9d03c5"]]);
//#endregion
//#region src/composables/color.ts
function Yr(e) {
	let t = e.trim().replace(/^#/, "");
	return t.length === 3 && (t = t.split("").map((e) => e + e).join("")), /^[0-9a-fA-F]{6}$/.test(t) ? {
		r: parseInt(t.slice(0, 2), 16),
		g: parseInt(t.slice(2, 4), 16),
		b: parseInt(t.slice(4, 6), 16)
	} : null;
}
var Xr = (e) => Math.max(0, Math.min(255, Math.round(e))), Zr = ({ r: e, g: t, b: n }) => "#" + [
	e,
	t,
	n
].map((e) => Xr(e).toString(16).padStart(2, "0")).join("");
function Qr(e, t) {
	return {
		r: e.r + (255 - e.r) * t,
		g: e.g + (255 - e.g) * t,
		b: e.b + (255 - e.b) * t
	};
}
function $r(e, t) {
	return {
		r: e.r * (1 - t),
		g: e.g * (1 - t),
		b: e.b * (1 - t)
	};
}
var ei = ({ r: e, g: t, b: n }, r) => `rgba(${Xr(e)}, ${Xr(t)}, ${Xr(n)}, ${r})`;
function ti({ r: e, g: t, b: n }) {
	let r = [
		e,
		t,
		n
	].map((e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	});
	return .2126 * r[0] + .7152 * r[1] + .0722 * r[2];
}
function ni(e) {
	let t = Yr(e);
	if (!t) return null;
	let n = ti(t) > .45 ? "#1a1205" : "#fff8ec";
	return {
		"--accent": Zr(t),
		"--accent-hover": Zr(Qr(t, .12)),
		"--accent-active": Zr($r(t, .12)),
		"--accent-soft": ei(t, .14),
		"--accent-ring": ei(t, .55),
		"--accent-contrast": n
	};
}
//#endregion
//#region src/composables/useTheme.ts
var ri = [
	"--accent",
	"--accent-hover",
	"--accent-active",
	"--accent-soft",
	"--accent-ring",
	"--accent-contrast"
];
function ii(e, t) {
	if (typeof document > "u") return;
	let n = document.documentElement;
	n.setAttribute("data-theme", e.theme), n.setAttribute("data-density", e.density), t ? n.setAttribute("data-reduced-motion", "true") : n.removeAttribute("data-reduced-motion");
	let r = e.accent ? ni(e.accent) : null;
	if (r) for (let [e, t] of Object.entries(r)) n.style.setProperty(e, t);
	else for (let e of ri) n.style.removeProperty(e);
}
function ai(e) {
	let t = Ir();
	e && !Lr() && (t.theme = e), ii(t, t.reducedMotion === "on" ? !0 : t.reducedMotion === "off" ? !1 : typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}
function oi() {
	let e = Y();
	return I(() => {
		ii({
			theme: e.theme,
			density: e.density,
			accent: e.accent
		}, e.effectiveReducedMotion);
	}), e;
}
//#endregion
//#region src/app/PhlixApp.vue?vue&type=script&setup=true&lang.ts
var si = ["src", "alt"], ci = { class: "brand-wordmark" }, li = {
	key: 1,
	class: "brand-tagline"
}, ui = { class: "main-nav" }, di = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "PhlixApp",
	setup(t) {
		oi();
		let n = Mr(), r = m("phlixConfig", null), a = i(() => r?.branding ?? {}), u = i(() => a.value.wordmark ?? "Phlix"), p = i(() => r?.menu ?? []), h = i(() => r?.routerBase ?? "/app");
		function g(e) {
			return /^\s*(javascript|data|vbscript):/i.test(e) ? void 0 : e;
		}
		return (t, r) => (S(), o(de, null, {
			logo: L(() => [f(A(U), {
				to: h.value,
				class: "brand"
			}, {
				default: L(() => [
					a.value.logoSrc ? (S(), c("img", {
						key: 0,
						src: a.value.logoSrc,
						alt: a.value.logoAlt ?? u.value,
						class: "brand-logo"
					}, null, 8, si)) : s("", !0),
					l("span", ci, k(u.value), 1),
					a.value.tagline ? (S(), c("span", li, k(a.value.tagline), 1)) : s("", !0)
				]),
				_: 1
			}, 8, ["to"])]),
			nav: L(() => [l("nav", ui, [p.value.length ? (S(!0), c(e, { key: 0 }, T(p.value, (e) => (S(), o(O(e.href ? "a" : A(U)), {
				key: e.id,
				to: e.href ? void 0 : e.to,
				href: e.href ? g(e.href) : void 0,
				target: e.href ? e.target : void 0,
				rel: e.href && e.target === "_blank" ? "noopener noreferrer" : void 0,
				class: "nav-link"
			}, {
				default: L(() => [e.icon ? (S(), o(J, {
					key: 0,
					name: e.icon,
					class: "nav-link-icon"
				}, null, 8, ["name"])) : s("", !0), d(" " + k(e.label), 1)]),
				_: 2
			}, 1032, [
				"to",
				"href",
				"target",
				"rel"
			]))), 128)) : (S(), c(e, { key: 1 }, [f(A(U), {
				to: h.value,
				class: "nav-link"
			}, {
				default: L(() => [...r[1] ||= [d("Browse", -1)]]),
				_: 1
			}, 8, ["to"]), f(A(U), {
				to: `${h.value}/settings`,
				class: "nav-link"
			}, {
				default: L(() => [...r[2] ||= [d("Settings", -1)]]),
				_: 1
			}, 8, ["to"])], 64)), f(_r, {
				name: "search",
				label: "Open command palette (⌘K)",
				size: "sm",
				class: "nav-cmdk",
				onClick: r[0] ||= (e) => A(n).openPalette()
			})])]),
			default: L(() => [f(A(ee)), f(Jr)]),
			_: 1
		}));
	}
}), [["__scopeId", "data-v-78cfb9e9"]]), fi = { class: "phlix-placeholder" }, pi = { class: "placeholder-content" }, mi = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Placeholder",
	props: { appName: {} },
	setup(e) {
		return (t, n) => (S(), c("div", fi, [l("div", pi, [n[0] ||= l("h1", null, "Shared UI loading...", -1), l("p", null, "Phlix " + k(e.appName) + " is initializing", 1)])]));
	}
}), [["__scopeId", "data-v-bf79ac4c"]]), hi = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(e), this.status = t, this.body = n, this.name = "ApiError";
	}
};
function gi(e) {
	return e === !0 || e === 1 || e === "1" || e === "true";
}
var X = class {
	baseUrl;
	tokens;
	doFetch;
	constructor(e = {}) {
		this.baseUrl = e.baseUrl ?? (typeof window < "u" ? window.location.origin : ""), this.tokens = e.tokenStore ?? {
			getAccessToken: () => null,
			setAccessToken: () => {},
			getRefreshToken: () => null,
			setRefreshToken: () => {},
			getUser: () => null,
			setUser: () => {},
			clear: () => {}
		}, this.doFetch = e.fetchImpl ?? globalThis.fetch.bind(globalThis);
	}
	async request(e, t, n = null, r) {
		let i = () => {
			let t = { "Content-Type": "application/json" }, i = this.tokens.getAccessToken();
			i && (t.Authorization = `Bearer ${i}`);
			let a = {
				method: e,
				headers: t,
				credentials: "same-origin"
			};
			return r && (a.signal = r), n !== null && (e === "POST" || e === "PUT" || e === "PATCH") && (a.body = JSON.stringify(n)), a;
		}, a = `${this.baseUrl}${t}`, o = await this.doFetch(a, i());
		return o.status === 401 && await this.refreshToken() && (o = await this.doFetch(a, i())), this.handleResponse(o);
	}
	async handleResponse(e) {
		let t = (e.headers.get("content-type") ?? "").includes("application/json") ? await e.json() : await e.text();
		if (!e.ok) throw new hi(this.extractError(t), e.status, t);
		return t;
	}
	extractError(e) {
		if (e && typeof e == "object") {
			let t = e;
			if (typeof t.error == "string") return t.error;
			if (typeof t.message == "string") return t.message;
		}
		return "Request failed";
	}
	async refreshToken() {
		let e = this.tokens.getRefreshToken();
		if (!e) return !1;
		try {
			let t = await this.doFetch(`${this.baseUrl}/auth/refresh`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "same-origin",
				body: JSON.stringify({ refresh_token: e })
			});
			if (!t.ok) return !1;
			let n = await t.json();
			return typeof n.access_token == "string" ? (this.tokens.setAccessToken(n.access_token), typeof n.refresh_token == "string" && this.tokens.setRefreshToken(n.refresh_token), !0) : !1;
		} catch {
			return !1;
		}
	}
	async get(e, t, n) {
		let r = t ? "?" + new URLSearchParams(t).toString() : "";
		return this.request("GET", e + r, null, n);
	}
	async post(e, t) {
		return this.request("POST", e, t ?? null);
	}
	async put(e, t) {
		return this.request("PUT", e, t ?? null);
	}
	async patch(e, t) {
		return this.request("PATCH", e, t ?? null);
	}
	async delete(e) {
		return this.request("DELETE", e);
	}
	isLoggedIn() {
		return this.tokens.getAccessToken() !== null;
	}
	async getCurrentUser() {
		let { user: e } = await this.get("/api/v1/auth/me");
		return {
			...e,
			is_admin: gi(e.is_admin)
		};
	}
	logout(e = !0) {
		this.tokens.clear(), e && typeof window < "u" && (window.location.href = "/login");
	}
}, Z = new X(), _i = 6e4, vi = 250;
function yi(e) {
	return typeof e == "object" && !!e && e.name === "AbortError";
}
var bi = H("media", () => {
	let e = w([]), t = w(0), n = w(!1), r = w(null), a = w(""), o = w([]), s = w(void 0), c = w(void 0), l = w([]), u = w([]), d = w("name"), f = w("asc"), p = w(24), m = w(0), h = i(() => e.value.length < t.value), g = i(() => {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = o.value), s.value !== void 0 && (e.yearFrom = s.value), c.value !== void 0 && (e.yearTo = c.value), l.value.length && (e.ratings = l.value), u.value.length && (e.types = u.value), e.sort = d.value, e.order = f.value, e.limit = p.value, e.offset = m.value, e;
	}), _ = i(() => {
		let t = /* @__PURE__ */ new Set();
		return e.value.forEach((e) => e.genres?.forEach((e) => t.add(e))), Array.from(t).sort();
	}), v = [
		"G",
		"PG",
		"PG-13",
		"R",
		"NC-17",
		"X",
		"UNRATED"
	], y = [
		"movie",
		"series",
		"episode",
		"audio",
		"image"
	];
	function b(e) {
		let t = new URLSearchParams();
		return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings", e)), e.types?.forEach((e) => t.append("types", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), t.set("limit", String(e.limit)), t.set("offset", String(e.offset)), t;
	}
	function x(e, t) {
		return `${e}/api/v1/media?${b(t).toString()}`;
	}
	function S(e) {
		return b(e).toString();
	}
	let C = /* @__PURE__ */ new Map(), T = /* @__PURE__ */ new Map(), E = null, D = null, O;
	function k(e) {
		return !!e && Date.now() - e.ts < _i;
	}
	function A(e, t, n, r) {
		r && (D && n !== E && D.abort(), E = n);
		let i = T.get(n);
		if (i) return r && (D = i.controller), i.promise;
		let a = new AbortController();
		r && (D = a);
		let o = new X({ baseUrl: e }).get(x(e, t), void 0, a.signal).then((e) => (C.set(n, {
			items: e.items,
			total: e.total,
			ts: Date.now()
		}), e)).finally(() => {
			T.delete(n);
		});
		return T.set(n, {
			promise: o,
			controller: a
		}), o;
	}
	function j(n, r) {
		e.value = r ? [...e.value, ...n.items] : n.items, t.value = n.total;
	}
	async function M(e, t = !1) {
		let i = { ...g.value }, a = S(i), o = C.get(a);
		if (k(o)) {
			j(o, t), r.value = null;
			return;
		}
		n.value = !0, r.value = null;
		try {
			let n = await A(e, i, a, !t);
			if (!t && a !== E) return;
			j(n, t);
		} catch (e) {
			if (yi(e)) return;
			(t || a === E) && (r.value = e instanceof Error ? e.message : "Failed to load media");
		} finally {
			(t || a === E) && (n.value = !1);
		}
	}
	function N(e, t = vi) {
		m.value = 0, clearTimeout(O), O = setTimeout(() => M(e, !1), t);
	}
	async function P(t) {
		n.value || !h.value || (m.value = e.value.length, await M(t, !0));
	}
	async function F(e, t = {}) {
		let n = {
			...g.value,
			...t
		}, r = S(n);
		if (!k(C.get(r))) try {
			await A(e, n, r, !1);
		} catch {}
	}
	function I() {
		C.clear();
	}
	function L() {
		clearTimeout(O);
	}
	function R() {
		let e = {};
		return a.value && (e.search = a.value), o.value.length && (e.genres = [...o.value]), s.value !== void 0 && (e.yearFrom = String(s.value)), c.value !== void 0 && (e.yearTo = String(c.value)), l.value.length && (e.ratings = [...l.value]), u.value.length && (e.types = [...u.value]), d.value !== "name" && (e.sort = d.value), f.value !== "asc" && (e.order = f.value), e;
	}
	function z(e) {
		return e == null ? [] : Array.isArray(e) ? e.filter((e) => e != null) : [e];
	}
	function B(e) {
		a.value = (Array.isArray(e.search) ? e.search[0] : e.search) ?? "", o.value = z(e.genres), l.value = z(e.ratings), u.value = z(e.types);
		let t = Array.isArray(e.yearFrom) ? e.yearFrom[0] : e.yearFrom, n = Array.isArray(e.yearTo) ? e.yearTo[0] : e.yearTo;
		s.value = t ? Number(t) : void 0, c.value = n ? Number(n) : void 0;
		let r = Array.isArray(e.sort) ? e.sort[0] : e.sort, i = Array.isArray(e.order) ? e.order[0] : e.order;
		d.value = r ?? "name", f.value = i ?? "asc", m.value = 0;
	}
	function V() {
		e.value = [], t.value = 0, m.value = 0, r.value = null;
	}
	function H(e) {
		a.value = e, m.value = 0;
	}
	function U(e) {
		o.value = e, m.value = 0;
	}
	function ee(e, t) {
		s.value = e, c.value = t, m.value = 0;
	}
	function te(e) {
		l.value = e, m.value = 0;
	}
	function W(e) {
		u.value = e, m.value = 0;
	}
	function G(e, t) {
		d.value = e, t && (f.value = t), m.value = 0;
	}
	return {
		items: e,
		total: t,
		loading: n,
		error: r,
		search: a,
		selectedGenres: o,
		yearFrom: s,
		yearTo: c,
		selectedRatings: l,
		selectedTypes: u,
		sort: d,
		order: f,
		limit: p,
		offset: m,
		hasMore: h,
		queryParams: g,
		availableGenres: _,
		availableRatings: v,
		availableTypes: y,
		fetchMedia: M,
		scheduleFetch: N,
		loadMore: P,
		prefetch: F,
		clearCache: I,
		cancelScheduled: L,
		toQuery: R,
		applyQuery: B,
		reset: V,
		setSearch: H,
		setGenres: U,
		setYearRange: ee,
		setRatings: te,
		setTypes: W,
		setSort: G
	};
}), xi = 30, Si = .95, Ci = 5e3, wi = "phlix.resume";
function Ti() {
	if (typeof localStorage > "u") return {};
	try {
		let e = localStorage.getItem(wi);
		return e ? JSON.parse(e) : {};
	} catch {
		return {};
	}
}
var Ei = H("phlix-player", () => {
	let e = Y(), t = w(null), n = w([]), r = w(!1), a = w(0), o = w(0), s = w(0), c = w(e.defaultVolume), l = w(!1), u = w(1), d = w(e.defaultQuality), f = w(e.defaultSubtitleLang), p = w(!1), m = w(Ti()), h = i(() => o.value > 0 ? a.value / o.value : 0), g = i(() => n.value[0] ?? null), _, v = 0;
	function y(e = !1) {
		if (typeof localStorage > "u") return;
		let t = () => {
			v = Date.now();
			try {
				localStorage.setItem(wi, JSON.stringify(m.value));
			} catch {}
		}, n = Date.now() - v;
		clearTimeout(_), e || n >= Ci ? t() : _ = setTimeout(t, Ci - n);
	}
	function b(e, t) {
		return t > 0 && e > 30 && e < t * .95;
	}
	function x(e, t, n) {
		b(t, n) ? m.value[e] = Math.floor(t) : delete m.value[e], y();
	}
	function S(e) {
		return e ? m.value[e] ?? null : null;
	}
	function C(e) {
		delete m.value[e], y(!0);
	}
	function T(e, n = {}) {
		t.value = e, n.resetPosition !== !1 && (a.value = 0, o.value = 0, s.value = 0), B(e);
	}
	function E(e, n, r) {
		a.value = e, n !== void 0 && (o.value = n), r !== void 0 && (s.value = r), t.value && x(t.value.id, e, o.value);
	}
	function D() {
		r.value = !0, typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "playing");
	}
	function O() {
		r.value = !1, t.value && x(t.value.id, a.value, o.value), y(!0), typeof navigator < "u" && navigator.mediaSession && (navigator.mediaSession.playbackState = "paused");
	}
	function k(e) {
		c.value = Math.min(1, Math.max(0, e)), c.value > 0 && (l.value = !1);
	}
	function A() {
		l.value = !l.value;
	}
	function j(e) {
		u.value = e;
	}
	function M(e) {
		d.value = e;
	}
	function N(e) {
		f.value = e;
	}
	function P(e) {
		n.value = [...e];
	}
	function F(e) {
		n.value.push(e);
	}
	function I() {
		let e = n.value.shift() ?? null;
		return e && T(e), e;
	}
	function L() {
		p.value = !0;
	}
	function R() {
		p.value = !1;
	}
	function z() {
		t.value && x(t.value.id, a.value, o.value), y(!0), r.value = !1, p.value = !1, t.value = null;
	}
	function B(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return;
		let t = globalThis.MediaMetadata;
		t && (navigator.mediaSession.metadata = new t({
			title: e.name,
			artist: e.director ?? e.genres?.join(", ") ?? "",
			album: e.year ? String(e.year) : "",
			artwork: e.poster_url ? [{ src: e.poster_url }] : []
		}));
	}
	function V(e) {
		if (typeof navigator > "u" || !("mediaSession" in navigator)) return () => {};
		let t = navigator.mediaSession, n = (e, n) => {
			try {
				t.setActionHandler(e, n);
			} catch {}
		};
		return e.onPlay && n("play", e.onPlay), e.onPause && n("pause", e.onPause), e.onNext && n("nexttrack", e.onNext), e.onPrevious && n("previoustrack", e.onPrevious), e.onSeek && n("seekto", (t) => e.onSeek?.(t.seekTime ?? 0)), () => {
			for (let e of [
				"play",
				"pause",
				"nexttrack",
				"previoustrack",
				"seekto"
			]) n(e, null);
		};
	}
	function H() {
		c.value = e.defaultVolume, d.value = e.defaultQuality, f.value = e.defaultSubtitleLang;
	}
	return {
		current: t,
		queue: n,
		playing: r,
		position: a,
		duration: o,
		buffered: s,
		volume: c,
		muted: l,
		rate: u,
		quality: d,
		subtitleLang: f,
		miniPlayer: p,
		resumeMap: m,
		progress: h,
		upNext: g,
		inResumeBand: b,
		saveResume: x,
		resumePositionFor: S,
		clearResume: C,
		setCurrent: T,
		updateProgress: E,
		play: D,
		pause: O,
		setVolume: k,
		toggleMute: A,
		setRate: j,
		setQuality: M,
		setSubtitle: N,
		setQueue: P,
		enqueue: F,
		next: I,
		showMiniPlayer: L,
		hideMiniPlayer: R,
		closePlayer: z,
		setMediaSessionMetadata: B,
		bindMediaSession: V,
		seedFromPreferences: H
	};
}), Di = H("phlix-toast", () => {
	let e = w([]), t = /* @__PURE__ */ new Map(), n = 0;
	function r(n) {
		let r = t.get(n);
		r && (clearTimeout(r), t.delete(n)), e.value = e.value.filter((e) => e.id !== n);
	}
	function i(i) {
		let a = ++n, o = {
			tone: "neutral",
			duration: 5e3,
			...i,
			id: a
		};
		return e.value.push(o), o.duration > 0 && t.set(a, setTimeout(() => r(a), o.duration)), a;
	}
	function a() {
		t.forEach((e) => clearTimeout(e)), t.clear(), e.value = [];
	}
	return {
		toasts: e,
		show: i,
		dismiss: r,
		clear: a,
		success: (e, t) => i({
			message: e,
			tone: "success",
			...t
		}),
		error: (e, t) => i({
			message: e,
			tone: "error",
			duration: 8e3,
			...t
		}),
		warning: (e, t) => i({
			message: e,
			tone: "warning",
			...t
		}),
		info: (e, t) => i({
			message: e,
			tone: "info",
			...t
		})
	};
}), Oi = { class: "media-card" }, ki = { class: "media-card__poster" }, Ai = ["href", "aria-label"], ji = { class: "visually-hidden" }, Mi = ["src", "alt"], Ni = {
	key: 1,
	class: "media-card__fallback",
	"aria-hidden": "true"
}, Pi = { class: "media-card__badges" }, Fi = {
	key: 0,
	class: "media-card__badge media-card__badge--new"
}, Ii = {
	key: 1,
	class: "media-card__badge media-card__badge--quality"
}, Li = ["aria-valuenow", "aria-label"], Ri = { class: "media-card__overlay" }, zi = { class: "media-card__title" }, Bi = { class: "media-card__meta" }, Vi = {
	key: 0,
	class: "numeric"
}, Hi = {
	key: 1,
	class: "media-card__dot"
}, Ui = {
	key: 2,
	class: "media-card__cert"
}, Wi = {
	key: 3,
	class: "media-card__dot"
}, Gi = {
	key: 4,
	class: "numeric"
}, Ki = {
	key: 0,
	class: "media-card__genres"
}, qi = { class: "media-card__actions" }, Ji = { class: "media-card__caption" }, Yi = ["title"], Xi = { class: "media-card__caption-sub numeric" }, Zi = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "MediaCard",
	props: {
		item: {},
		to: {},
		quality: {},
		newWithinDays: { default: 30 }
	},
	emits: [
		"play",
		"watchlist",
		"info"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, o = Ei(), u = i(() => r.to ?? `/app/player/${r.item.id}`), p = w(!1), m = w(null);
		function h() {
			p.value = !0;
		}
		b(() => {
			m.value?.complete && (p.value = !0);
		});
		let g = i(() => {
			let e = r.item.created_at;
			if (!e) return !1;
			let t = Date.parse(e);
			return Number.isNaN(t) ? !1 : Date.now() - t <= r.newWithinDays * 24 * 60 * 60 * 1e3;
		}), y = i(() => {
			let e = o.resumePositionFor(r.item.id), t = r.item.runtime;
			return !e || !t || t <= 0 ? 0 : Math.min(1, Math.max(0, e / (t * 60)));
		}), x = i(() => r.item.genres?.slice(0, 3) ?? []);
		return (n, r) => (S(), c("article", Oi, [l("div", ki, [
			l("a", {
				href: u.value,
				class: "media-card__link",
				"aria-label": t.item.name
			}, [l("span", ji, k(t.item.name), 1)], 8, Ai),
			t.item.poster_url ? (S(), c("img", {
				key: 0,
				ref_key: "imgEl",
				ref: m,
				class: _(["media-card__img", { "is-loaded": p.value }]),
				src: t.item.poster_url,
				alt: t.item.name,
				loading: "lazy",
				decoding: "async",
				onLoad: h
			}, null, 42, Mi)) : (S(), c("div", Ni, [f(J, { name: t.item.type === "audio" ? "music" : t.item.type === "image" ? "image" : t.item.type === "series" ? "tv" : "film" }, null, 8, ["name"])])),
			l("div", Pi, [
				g.value ? (S(), c("span", Fi, "New")) : s("", !0),
				E(n.$slots, "badges", { item: t.item }, void 0, !0),
				t.quality ? (S(), c("span", Ii, k(t.quality), 1)) : s("", !0)
			]),
			y.value > 0 ? (S(), c("div", {
				key: 2,
				class: "media-card__progress",
				role: "progressbar",
				"aria-valuenow": Math.round(y.value * 100),
				"aria-valuemin": "0",
				"aria-valuemax": "100",
				"aria-label": `Resume ${t.item.name}`
			}, [l("i", { style: v({ width: `${y.value * 100}%` }) }, null, 4)], 8, Li)) : s("", !0),
			l("div", Ri, [
				l("h3", zi, k(t.item.name), 1),
				l("div", Bi, [
					t.item.year ? (S(), c("span", Vi, k(t.item.year), 1)) : s("", !0),
					t.item.year && (t.item.rating || t.item.runtime) ? (S(), c("span", Hi)) : s("", !0),
					t.item.rating ? (S(), c("span", Ui, k(t.item.rating), 1)) : s("", !0),
					t.item.rating && t.item.runtime ? (S(), c("span", Wi)) : s("", !0),
					t.item.runtime ? (S(), c("span", Gi, k(t.item.runtime) + "m", 1)) : s("", !0)
				]),
				x.value.length ? (S(), c("div", Ki, [(S(!0), c(e, null, T(x.value, (e) => (S(), c("span", { key: e }, k(e), 1))), 128))])) : s("", !0),
				l("div", qi, [
					l("button", {
						type: "button",
						class: "media-card__iconbtn media-card__iconbtn--play",
						"aria-label": "Play",
						onClick: r[0] ||= (e) => a("play", t.item)
					}, [f(J, { name: "play" })]),
					l("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "Add to watchlist",
						onClick: r[1] ||= (e) => a("watchlist", t.item)
					}, [f(J, { name: "bookmark-plus" })]),
					l("button", {
						type: "button",
						class: "media-card__iconbtn",
						"aria-label": "More info",
						onClick: r[2] ||= (e) => a("info", t.item)
					}, [f(J, { name: "info" })]),
					E(n.$slots, "actions", { item: t.item }, void 0, !0)
				])
			])
		]), l("div", Ji, [l("div", {
			class: "media-card__caption-title",
			title: t.item.name
		}, k(t.item.name), 9, Yi), l("div", Xi, [
			t.item.year ? (S(), c(e, { key: 0 }, [d(k(t.item.year), 1)], 64)) : s("", !0),
			t.item.year && t.item.runtime ? (S(), c(e, { key: 1 }, [d(" · ")], 64)) : s("", !0),
			t.item.runtime ? (S(), c(e, { key: 2 }, [d(k(t.item.runtime) + "m", 1)], 64)) : s("", !0)
		])])]));
	}
}), [["__scopeId", "data-v-a291d5b1"]]), Qi = 3 / 2;
function $i(e, t, n = 20) {
	return e <= 0 || t <= 0 ? 1 : Math.max(1, Math.floor((e + n) / (t + n)));
}
function ea(e, t, n = 20) {
	return t <= 0 || e <= 0 ? 0 : (e - n * (t - 1)) / t;
}
function ta(e, t = 56, n = 24) {
	return e <= 0 ? 0 : e * Qi + t + n;
}
function na(e) {
	let { scrollTop: t, viewportHeight: n, rowHeight: r, columns: i, itemCount: a, overscan: o } = e, s = Math.max(1, i), c = Math.ceil(a / s), l = c * r;
	if (c === 0 || r <= 0) return {
		startRow: 0,
		endRow: c,
		startIndex: 0,
		endIndex: a,
		rowCount: c,
		padTop: 0,
		totalHeight: l
	};
	let u = Math.floor(Math.max(0, t) / r), d = Math.ceil(Math.max(0, n) / r) + 1, f = Math.max(0, u - o), p = Math.min(c, u + d + o);
	return {
		startRow: f,
		endRow: p,
		startIndex: f * s,
		endIndex: Math.min(a, p * s),
		rowCount: c,
		padTop: f * r,
		totalHeight: l
	};
}
//#endregion
//#region src/components/MediaGrid.vue?vue&type=script&setup=true&lang.ts
var ra = { class: "media-grid-root" }, ia = {
	key: 1,
	class: "media-grid-empty",
	role: "status"
}, aa = {
	key: 0,
	class: "media-grid-more",
	role: "status",
	"aria-live": "polite"
}, oa = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "MediaGrid",
	props: {
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		loadingMore: {
			type: Boolean,
			default: !1
		},
		hasMore: {
			type: Boolean,
			default: !1
		},
		cardSize: {},
		skeletonCount: { default: 18 },
		overscan: { default: 2 }
	},
	emits: [
		"load-more",
		"play",
		"watchlist",
		"info"
	],
	setup(t, { emit: r }) {
		let a = t, o = r, u = Y(), p = i(() => a.cardSize ?? u.cardSize ?? 180), m = w(null), h = w(null), _ = w(0), x = w(0), C = w(0);
		function D() {
			let e = m.value;
			if (!e || typeof e.getBoundingClientRect != "function") return;
			let t = e.getBoundingClientRect();
			t.width > 0 && (_.value = t.width);
			let n = typeof window < "u" ? window.innerHeight : 0;
			n > 0 && (x.value = n), C.value = Math.max(0, -t.top);
		}
		let O = 0;
		function k() {
			O ||= (typeof requestAnimationFrame == "function" ? requestAnimationFrame : (e) => setTimeout(() => e(0), 16))(() => {
				O = 0, D();
			});
		}
		let A = i(() => $i(_.value, p.value, 20)), j = i(() => ta(ea(_.value, A.value, 20))), M = i(() => _.value > 0 && j.value > 0), N = i(() => na({
			scrollTop: C.value,
			viewportHeight: x.value,
			rowHeight: j.value,
			columns: A.value,
			itemCount: a.items.length,
			overscan: a.overscan
		})), P = i(() => {
			if (!M.value) return a.items.map((e, t) => ({
				item: e,
				index: t
			}));
			let { startIndex: e, endIndex: t } = N.value, n = [];
			for (let r = e; r < t; r++) n.push({
				item: a.items[r],
				index: r
			});
			return n;
		}), I = i(() => ({ gridTemplateColumns: M.value ? `repeat(${A.value}, minmax(0, 1fr))` : `repeat(auto-fill, minmax(${p.value}px, 1fr))` })), R = i(() => M.value ? { height: `${N.value.totalHeight}px` } : {}), z = i(() => M.value ? {
			position: "absolute",
			top: "0",
			left: "0",
			right: "0",
			transform: `translateY(${N.value.padTop}px)`
		} : {}), B = i(() => ({ gridTemplateColumns: `repeat(auto-fill, minmax(${p.value}px, 1fr))` })), V = i(() => M.value && C.value > x.value * 1.5);
		function H() {
			if (typeof window > "u") return;
			let e = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
			window.scrollTo?.({
				top: 0,
				behavior: e ? "auto" : "smooth"
			});
		}
		let U = null;
		function ee() {
			U || typeof IntersectionObserver > "u" || (U = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && a.hasMore && !a.loading && !a.loadingMore && o("load-more");
			}, { rootMargin: "400px 0px" }), h.value && U.observe(h.value));
		}
		function te() {
			U?.disconnect(), U = null;
		}
		F(() => h.value, (e) => {
			te(), e && (ee(), k());
		});
		let W = null;
		function G() {
			W || typeof ResizeObserver > "u" || !m.value || (W = new ResizeObserver(k), W.observe(m.value));
		}
		function K() {
			W?.disconnect(), W = null;
		}
		return F(() => m.value, (e) => {
			K(), e && (G(), k());
		}), b(() => {
			D(), typeof window < "u" && (window.addEventListener("scroll", k, { passive: !0 }), window.addEventListener("resize", k, { passive: !0 })), G(), ee();
		}), y(() => {
			typeof window < "u" && (window.removeEventListener("scroll", k), window.removeEventListener("resize", k)), O &&= (typeof cancelAnimationFrame == "function" ? cancelAnimationFrame(O) : clearTimeout(O), 0), K(), te();
		}), F(() => a.items.length, () => g(k)), (r, i) => (S(), c("div", ra, [t.loading && t.items.length === 0 ? (S(), c("div", {
			key: 0,
			class: "media-grid media-grid--skeleton",
			style: v(B.value),
			role: "status",
			"aria-busy": "true",
			"aria-label": "Loading media"
		}, [(S(!0), c(e, null, T(t.skeletonCount, (e) => (S(), c("div", {
			key: e,
			class: "skel-card",
			"aria-hidden": "true"
		}, [...i[0] ||= [
			l("div", { class: "skel-poster" }, null, -1),
			l("div", { class: "skel-title" }, null, -1),
			l("div", { class: "skel-sub" }, null, -1)
		]]))), 128))], 4)) : t.items.length === 0 ? (S(), c("div", ia, [E(r.$slots, "empty", {}, () => [
			f(J, {
				name: "film",
				class: "media-grid-empty__icon"
			}),
			i[1] ||= l("p", { class: "media-grid-empty__title" }, "No media found", -1),
			i[2] ||= l("p", { class: "media-grid-empty__hint" }, "Try adjusting your filters.", -1)
		], !0)])) : (S(), c(e, { key: 2 }, [
			l("div", {
				ref_key: "sizerEl",
				ref: m,
				class: "media-grid-sizer",
				style: v(R.value)
			}, [l("div", {
				class: "media-grid",
				style: v([I.value, z.value])
			}, [(S(!0), c(e, null, T(P.value, (e) => E(r.$slots, "card", {
				key: e.item.id,
				item: e.item,
				index: e.index
			}, () => [f(Zi, {
				item: e.item,
				onPlay: (t) => o("play", e.item),
				onWatchlist: (t) => o("watchlist", e.item),
				onInfo: (t) => o("info", e.item)
			}, null, 8, [
				"item",
				"onPlay",
				"onWatchlist",
				"onInfo"
			])], !0)), 128))], 4)], 4),
			t.loadingMore ? (S(), c("div", aa, [...i[3] ||= [l("span", {
				class: "media-grid-more__spinner",
				"aria-hidden": "true"
			}, null, -1), d(" Loading more… ", -1)]])) : s("", !0),
			t.hasMore && !t.loadingMore ? (S(), c("div", {
				key: 1,
				ref_key: "sentinelEl",
				ref: h,
				class: "media-grid-sentinel",
				"aria-hidden": "true"
			}, null, 512)) : s("", !0)
		], 64)), f(n, { name: "media-grid-fade" }, {
			default: L(() => [V.value ? (S(), c("button", {
				key: 0,
				type: "button",
				class: "media-grid-top",
				"aria-label": "Back to top",
				onClick: H
			}, [f(J, { name: "arrow-up" })])) : s("", !0)]),
			_: 1
		})]));
	}
}), [["__scopeId", "data-v-b9e31bb0"]]), sa = {
	class: "phlix-empty",
	role: "status"
}, ca = { class: "phlix-empty__icon" }, la = { class: "phlix-empty__title" }, ua = {
	key: 0,
	class: "phlix-empty__desc"
}, da = {
	key: 1,
	class: "phlix-empty__actions"
}, fa = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "EmptyState",
	props: {
		icon: { default: "film" },
		title: {},
		description: {}
	},
	setup(e) {
		return (t, n) => (S(), c("div", sa, [
			l("span", ca, [f(J, { name: e.icon }, null, 8, ["name"])]),
			l("h3", la, k(e.title), 1),
			e.description || t.$slots.default ? (S(), c("p", ua, [E(t.$slots, "default", {}, () => [d(k(e.description), 1)], !0)])) : s("", !0),
			t.$slots.actions ? (S(), c("div", da, [E(t.$slots, "actions", {}, void 0, !0)])) : s("", !0)
		]));
	}
}), [["__scopeId", "data-v-9c6d2458"]]), pa = {
	key: 0,
	class: "phlix-skel-text",
	"aria-hidden": "true"
}, Q = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Skeleton",
	props: {
		variant: { default: "rect" },
		width: {},
		height: {},
		radius: {},
		lines: { default: 1 }
	},
	setup(t) {
		return (n, r) => t.variant === "text" ? (S(), c("div", pa, [(S(!0), c(e, null, T(t.lines, (e) => (S(), c("span", {
			key: e,
			class: "phlix-skel phlix-skel--text",
			style: v({ width: e === t.lines && t.lines > 1 ? "60%" : t.width })
		}, null, 4))), 128))])) : (S(), c("span", {
			key: 1,
			class: _(["phlix-skel", `phlix-skel--${t.variant}`]),
			"aria-hidden": "true",
			style: v({
				width: t.width,
				height: t.height,
				borderRadius: t.radius
			})
		}, null, 6));
	}
}), [["__scopeId", "data-v-c34e4066"]]), ma = ["aria-label"], ha = { class: "media-row__head" }, ga = { class: "media-row__title" }, _a = {
	key: 0,
	class: "media-row__count numeric"
}, va = { class: "media-row__action" }, ya = {
	key: 0,
	class: "media-row__error",
	role: "alert"
}, ba = {
	key: 1,
	class: "media-row__rail",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading"
}, xa = { class: "media-row__skel-poster" }, Sa = ["aria-label"], Ca = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "MediaRow",
	props: {
		title: {},
		items: {},
		loading: {
			type: Boolean,
			default: !1
		},
		error: { default: null },
		count: { default: null },
		skeletonCount: { default: 6 },
		emptyText: {},
		hideWhenEmpty: {
			type: Boolean,
			default: !1
		},
		cardTo: {}
	},
	emits: [
		"play",
		"watchlist",
		"info",
		"retry"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => !r.loading && !r.error && r.items.length === 0), d = i(() => r.hideWhenEmpty && u.value);
		return (n, r) => d.value ? s("", !0) : (S(), c("section", {
			key: 0,
			class: "media-row",
			"aria-label": t.title
		}, [l("div", ha, [
			l("h2", ga, k(t.title), 1),
			t.count == null ? s("", !0) : (S(), c("span", _a, k(t.count.toLocaleString()), 1)),
			l("div", va, [E(n.$slots, "action", {}, void 0, !0)])
		]), t.error ? (S(), c("div", ya, [l("span", null, k(t.error), 1), l("button", {
			type: "button",
			class: "media-row__retry",
			onClick: r[0] ||= (e) => a("retry")
		}, "Retry")])) : t.loading && t.items.length === 0 ? (S(), c("div", ba, [(S(!0), c(e, null, T(t.skeletonCount, (e) => (S(), c("div", {
			key: e,
			class: "media-row__cell",
			"aria-hidden": "true"
		}, [l("div", xa, [f(Q, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "100%"
		})]), f(Q, {
			variant: "text",
			width: "80%"
		})]))), 128))])) : u.value ? (S(), o(fa, {
			key: 2,
			title: t.title,
			description: t.emptyText ?? "Nothing here yet."
		}, {
			default: L(() => [E(n.$slots, "empty", {}, void 0, !0)]),
			_: 3
		}, 8, ["title", "description"])) : (S(), c("ul", {
			key: 3,
			class: "media-row__rail",
			"aria-label": t.title
		}, [(S(!0), c(e, null, T(t.items, (e) => (S(), c("li", {
			key: e.id,
			class: "media-row__cell"
		}, [f(Zi, {
			item: e,
			to: t.cardTo ? t.cardTo(e) : void 0,
			onPlay: r[1] ||= (e) => a("play", e),
			onWatchlist: r[2] ||= (e) => a("watchlist", e),
			onInfo: r[3] ||= (e) => a("info", e)
		}, null, 8, ["item", "to"])]))), 128))], 8, Sa))], 8, ma));
	}
}), [["__scopeId", "data-v-a238c0f7"]]);
//#endregion
//#region src/api/media-query.ts
function wa(e = {}) {
	let t = new URLSearchParams();
	return e.search && t.set("search", e.search), e.genres?.forEach((e) => t.append("genres", e)), e.yearFrom !== void 0 && t.set("yearFrom", String(e.yearFrom)), e.yearTo !== void 0 && t.set("yearTo", String(e.yearTo)), e.ratings?.forEach((e) => t.append("ratings", e)), e.types?.forEach((e) => t.append("types", e)), e.actors?.forEach((e) => t.append("actors", e)), e.sort && t.set("sort", e.sort), e.order && t.set("order", e.order), e.limit !== void 0 && t.set("limit", String(e.limit)), e.offset !== void 0 && t.set("offset", String(e.offset)), t.toString();
}
function Ta(e, t = {}) {
	return `${e}/api/v1/media?${wa(t)}`;
}
//#endregion
//#region src/components/HomeRow.vue
var Ea = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "HomeRow",
	props: {
		row: {},
		apiBase: {},
		limit: { default: 18 }
	},
	emits: [
		"items-loaded",
		"play",
		"watchlist",
		"info",
		"see-all"
	],
	setup(e, { emit: t }) {
		let n = e, r = t, i = Di(), a = w([]), o = w(null), s = w(!1), u = w(null), d = w(!1), p = w(null), m = null, h = null, g = !1;
		function _(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function v() {
			if (!s.value) {
				s.value = !0, u.value = null, h = typeof AbortController < "u" ? new AbortController() : null;
				try {
					let e = new X({ baseUrl: n.apiBase }), t = Ta(n.apiBase, {
						...n.row.query,
						limit: n.limit,
						offset: 0
					}), i = await e.get(t, void 0, h?.signal);
					if (g) return;
					a.value = i.items ?? [], o.value = typeof i.total == "number" ? i.total : a.value.length, d.value = !0, r("items-loaded", a.value);
				} catch (e) {
					if (g || _(e)) return;
					u.value = e instanceof Error ? e.message : "Failed to load", i.error(`Couldn't load "${n.row.title}"`);
				} finally {
					g || (s.value = !1);
				}
			}
		}
		function x() {
			if (typeof IntersectionObserver > "u" || !p.value) {
				v();
				return;
			}
			m = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (m?.disconnect(), m = null, v());
			}, { rootMargin: "300px" }), m.observe(p.value);
		}
		return b(x), y(() => {
			g = !0, h?.abort(), h = null, m?.disconnect(), m = null;
		}), (t, n) => (S(), c("div", {
			ref_key: "rootEl",
			ref: p
		}, [f(Ca, {
			title: e.row.title,
			items: a.value,
			loading: s.value || !d.value && !u.value,
			error: u.value,
			count: o.value,
			"hide-when-empty": "",
			onRetry: v,
			onPlay: n[1] ||= (e) => r("play", e),
			onWatchlist: n[2] ||= (e) => r("watchlist", e),
			onInfo: n[3] ||= (e) => r("info", e)
		}, {
			action: L(() => [l("button", {
				type: "button",
				class: "home-row__seeall",
				onClick: n[0] ||= (t) => r("see-all", e.row)
			}, "See all")]),
			_: 1
		}, 8, [
			"title",
			"items",
			"loading",
			"error",
			"count"
		])], 512));
	}
}), [["__scopeId", "data-v-fb0faca3"]]), Da = ["disabled", "aria-pressed"], Oa = { class: "phlix-chip__label" }, ka = ["disabled", "aria-label"], Aa = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Chip",
	props: {
		selected: {
			type: Boolean,
			default: void 0
		},
		removable: {
			type: Boolean,
			default: !1
		},
		icon: {},
		size: { default: "sm" },
		disabled: {
			type: Boolean,
			default: !1
		},
		removeLabel: { default: "Remove" }
	},
	emits: [
		"update:selected",
		"click",
		"remove"
	],
	setup(e, { emit: t }) {
		let n = e, r = t;
		function i() {
			n.disabled || (n.selected !== void 0 && r("update:selected", !n.selected), r("click"));
		}
		return (t, n) => (S(), c("span", { class: _(["phlix-chip", [`phlix-chip--${e.size}`, {
			"is-selected": e.selected,
			"is-disabled": e.disabled
		}]]) }, [l("button", {
			type: "button",
			class: "phlix-chip__main",
			disabled: e.disabled,
			"aria-pressed": e.selected === void 0 ? void 0 : e.selected,
			onClick: i
		}, [e.icon ? (S(), o(J, {
			key: 0,
			name: e.icon,
			class: "phlix-chip__icon"
		}, null, 8, ["name"])) : s("", !0), l("span", Oa, [E(t.$slots, "default", {}, void 0, !0)])], 8, Da), e.removable ? (S(), c("button", {
			key: 0,
			type: "button",
			class: "phlix-chip__remove",
			disabled: e.disabled,
			"aria-label": e.removeLabel,
			onClick: n[0] ||= (e) => r("remove")
		}, [f(J, { name: "x" })], 8, ka)) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-d6cd193e"]]);
//#endregion
//#region src/components/ui/listbox.ts
function ja(e) {
	return e.map((e) => typeof e == "object" ? e : {
		value: e,
		label: String(e)
	});
}
function $(e, t, n) {
	let r = e.length;
	if (r === 0) return -1;
	let i = t;
	for (let t = 0; t < r; t++) if (i = (i + n + r) % r, !e[i]?.disabled) return i;
	return t;
}
function Ma(e, t) {
	return t === "first" ? $(e, -1, 1) : $(e, 0, -1);
}
//#endregion
//#region src/components/ui/Combobox.vue?vue&type=script&setup=true&lang.ts
var Na = { class: "phlix-combobox__field" }, Pa = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"placeholder",
	"disabled",
	"value"
], Fa = ["id", "aria-label"], Ia = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], La = { class: "phlix-combobox__check" }, Ra = {
	key: 0,
	class: "phlix-combobox__empty",
	role: "presentation"
}, za = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Combobox",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Search…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => ja(r.options)), p = j(), m = w(!1), h = w(-1), v = w(""), b = w(!1), x = w(null), C = w(null), E = w(null), D = i(() => u.value.find((e) => e.value === r.modelValue)?.label ?? ""), O = i(() => {
			if (!b.value || v.value.trim() === "") return u.value;
			let e = v.value.toLowerCase();
			return u.value.filter((t) => t.label.toLowerCase().includes(e));
		}), M = i(() => h.value >= 0 ? `${p}-opt-${h.value}` : void 0);
		F(() => r.modelValue, () => {
			m.value || (v.value = D.value);
		}, { immediate: !0 });
		function N() {
			r.disabled || m.value || (m.value = !0, h.value = O.value.findIndex((e) => e.value === r.modelValue), h.value < 0 && (h.value = O.value.findIndex((e) => !e.disabled)), g(B));
		}
		function I() {
			v.value = D.value, b.value = !1, m.value = !1;
		}
		function L(e) {
			let t = O.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (a("update:modelValue", t.value), a("change", t.value)), v.value = t.label, b.value = !1, m.value = !1, C.value?.focus());
		}
		function z(e) {
			O.value.length !== 0 && (h.value = $(O.value, h.value, e), g(B));
		}
		function B() {
			E.value?.querySelector(".is-active")?.scrollIntoView?.({ block: "nearest" });
		}
		function V(e) {
			v.value = e.target.value, b.value = !0, m.value = !0, h.value = Ma(O.value, "first");
		}
		function H(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), m.value ? z(1) : N();
					break;
				case "ArrowUp":
					e.preventDefault(), m.value ? z(-1) : N();
					break;
				case "Enter":
					m.value && h.value >= 0 && (e.preventDefault(), L(h.value));
					break;
				case "Escape":
					m.value && (e.preventDefault(), I());
					break;
				case "Tab":
					m.value && I();
					break;
			}
		}
		function U(e) {
			m.value && x.value && !x.value.contains(e.target) && I();
		}
		return F(m, (e) => {
			e ? document.addEventListener("pointerdown", U, !0) : document.removeEventListener("pointerdown", U, !0);
		}), y(() => document.removeEventListener("pointerdown", U, !0)), (n, r) => (S(), c("div", {
			ref_key: "rootEl",
			ref: x,
			class: _(["phlix-combobox", {
				"is-open": m.value,
				"is-disabled": t.disabled
			}])
		}, [l("div", Na, [
			f(J, {
				name: "search",
				class: "phlix-combobox__search"
			}),
			l("input", {
				ref_key: "inputEl",
				ref: C,
				class: "phlix-combobox__input",
				type: "text",
				role: "combobox",
				autocomplete: "off",
				"aria-autocomplete": "list",
				"aria-expanded": m.value,
				"aria-controls": m.value ? `${A(p)}-list` : void 0,
				"aria-activedescendant": m.value ? M.value : void 0,
				"aria-label": t.label,
				placeholder: t.placeholder,
				disabled: t.disabled,
				value: v.value,
				onInput: V,
				onFocus: N,
				onKeydown: H
			}, null, 40, Pa),
			f(J, {
				name: "chevron-down",
				class: "phlix-combobox__caret"
			})
		]), R(l("ul", {
			id: `${A(p)}-list`,
			ref_key: "listEl",
			ref: E,
			class: "phlix-combobox__list",
			role: "listbox",
			"aria-label": t.label
		}, [(S(!0), c(e, null, T(O.value, (e, n) => (S(), c("li", {
			id: `${A(p)}-opt-${n}`,
			key: e.value,
			class: _(["phlix-combobox__option", {
				"is-active": n === h.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => L(n),
			onPointermove: (t) => !e.disabled && (h.value = n)
		}, [l("span", La, [e.value === t.modelValue ? (S(), o(J, {
			key: 0,
			name: "check"
		})) : s("", !0)]), d(" " + k(e.label), 1)], 42, Ia))), 128)), O.value.length === 0 ? (S(), c("li", Ra, "No matches")) : s("", !0)], 8, Fa), [[P, m.value]])], 2));
	}
}), [["__scopeId", "data-v-337aab6e"]]), Ba = [
	"aria-expanded",
	"aria-controls",
	"aria-activedescendant",
	"aria-label",
	"disabled"
], Va = ["id", "aria-label"], Ha = [
	"id",
	"aria-selected",
	"aria-disabled",
	"onClick",
	"onPointermove"
], Ua = { class: "phlix-select__check" }, Wa = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Select",
	props: {
		modelValue: {},
		options: {},
		placeholder: { default: "Select…" },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "change"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => ja(r.options)), p = j(), m = w(!1), h = w(-1), v = w(null), b = w(null), x = "", C, E = i(() => u.value.findIndex((e) => e.value === r.modelValue)), D = i(() => u.value[E.value]?.label ?? ""), O = i(() => h.value >= 0 ? `${p}-opt-${h.value}` : void 0);
		function M() {
			r.disabled || m.value || (m.value = !0, h.value = E.value >= 0 ? E.value : Ma(u.value, "first"), g(z));
		}
		function N() {
			m.value = !1;
		}
		function I(e) {
			let t = u.value[e];
			!t || t.disabled || (t.value !== r.modelValue && (a("update:modelValue", t.value), a("change", t.value)), N(), v.value?.querySelector(".phlix-select__trigger")?.focus());
		}
		function L(e) {
			h.value = $(u.value, h.value, e), g(z);
		}
		function z() {
			(b.value?.querySelector(".is-active"))?.scrollIntoView?.({ block: "nearest" });
		}
		function B(e) {
			if (!r.disabled) switch (e.key) {
				case "ArrowDown":
					e.preventDefault(), m.value ? L(1) : M();
					break;
				case "ArrowUp":
					e.preventDefault(), m.value ? L(-1) : M();
					break;
				case "Home":
					m.value && (e.preventDefault(), h.value = Ma(u.value, "first"), g(z));
					break;
				case "End":
					m.value && (e.preventDefault(), h.value = Ma(u.value, "last"), g(z));
					break;
				case "Enter":
				case " ":
					e.preventDefault(), m.value && h.value >= 0 ? I(h.value) : M();
					break;
				case "Escape":
					m.value && (e.preventDefault(), N());
					break;
				case "Tab":
					N();
					break;
				default: e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && V(e.key);
			}
		}
		function V(e) {
			m.value || M(), x += e.toLowerCase(), clearTimeout(C), C = setTimeout(() => x = "", 600);
			let t = u.value.findIndex((e) => !e.disabled && e.label.toLowerCase().startsWith(x));
			t >= 0 && (h.value = t, g(z));
		}
		function H(e) {
			m.value && v.value && !v.value.contains(e.target) && N();
		}
		return F(m, (e) => {
			e ? document.addEventListener("pointerdown", H, !0) : document.removeEventListener("pointerdown", H, !0);
		}), y(() => {
			document.removeEventListener("pointerdown", H, !0), clearTimeout(C);
		}), (n, r) => (S(), c("div", {
			ref_key: "rootEl",
			ref: v,
			class: _(["phlix-select", {
				"is-open": m.value,
				"is-disabled": t.disabled
			}])
		}, [l("button", {
			type: "button",
			class: "phlix-select__trigger",
			"aria-haspopup": "listbox",
			"aria-expanded": m.value,
			"aria-controls": m.value ? `${A(p)}-list` : void 0,
			"aria-activedescendant": m.value ? O.value : void 0,
			"aria-label": t.label,
			disabled: t.disabled,
			onClick: r[0] ||= (e) => m.value ? N() : M(),
			onKeydown: B
		}, [l("span", { class: _(["phlix-select__value", { "is-placeholder": E.value < 0 }]) }, k(E.value >= 0 ? D.value : t.placeholder), 3), f(J, {
			name: "chevron-down",
			class: "phlix-select__caret"
		})], 40, Ba), R(l("ul", {
			id: `${A(p)}-list`,
			ref_key: "listEl",
			ref: b,
			class: "phlix-select__list",
			role: "listbox",
			"aria-label": t.label
		}, [(S(!0), c(e, null, T(u.value, (e, n) => (S(), c("li", {
			id: `${A(p)}-opt-${n}`,
			key: e.value,
			class: _(["phlix-select__option", {
				"is-active": n === h.value,
				"is-disabled": e.disabled
			}]),
			role: "option",
			"aria-selected": e.value === t.modelValue,
			"aria-disabled": e.disabled || void 0,
			onClick: (e) => I(n),
			onPointermove: (t) => !e.disabled && (h.value = n)
		}, [l("span", Ua, [e.value === t.modelValue ? (S(), o(J, {
			key: 0,
			name: "check"
		})) : s("", !0)]), d(" " + k(e.label), 1)], 42, Ha))), 128))], 8, Va), [[P, m.value]])], 2));
	}
}), [["__scopeId", "data-v-db34d47a"]]), Ga = ["role", "aria-label"], Ka = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Badge",
	props: {
		tone: { default: "neutral" },
		size: { default: "sm" },
		mono: {
			type: Boolean,
			default: !1
		},
		icon: {},
		label: {}
	},
	setup(e) {
		return (t, n) => (S(), c("span", {
			class: _(["phlix-badge", [
				`phlix-badge--${e.tone}`,
				`phlix-badge--${e.size}`,
				{ "phlix-badge--mono": e.mono }
			]]),
			role: e.label ? "img" : void 0,
			"aria-label": e.label
		}, [e.icon ? (S(), o(J, {
			key: 0,
			name: e.icon,
			class: "phlix-badge__icon"
		}, null, 8, ["name"])) : s("", !0), E(t.$slots, "default", {}, void 0, !0)], 10, Ga));
	}
}), [["__scopeId", "data-v-8f8d0fd2"]]), qa = { class: "filterbar__main" }, Ja = { class: "filterbar__search" }, Ya = { class: "filterbar__sort" }, Xa = ["aria-label"], Za = ["aria-expanded"], Qa = { class: "filterbar__advanced" }, $a = { class: "filterbar__field" }, eo = { class: "filterbar__field" }, to = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Rating"
}, no = { class: "filterbar__field" }, ro = {
	class: "filterbar__chips",
	role: "group",
	"aria-label": "Type"
}, io = { class: "filterbar__field" }, ao = { class: "filterbar__years" }, oo = { class: "filterbar__field filterbar__presets" }, so = { class: "filterbar__chips" }, co = {
	key: 0,
	class: "filterbar__presets-empty"
}, lo = {
	key: 0,
	class: "filterbar__preset-save"
}, uo = ["onKeydown"], fo = ["disabled"], po = { class: "filterbar__active" }, mo = {
	class: "filterbar__count",
	"aria-live": "polite"
}, ho = { class: "filterbar__pills" }, go = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "FilterBar",
	props: {
		searchDebounce: { default: 250 },
		sticky: {
			type: Boolean,
			default: !0
		}
	},
	emits: ["change"],
	setup(t, { emit: r }) {
		let a = t, u = r, p = bi(), m = Y(), h = [
			{
				value: "name",
				label: "Name"
			},
			{
				value: "year",
				label: "Year"
			},
			{
				value: "rating",
				label: "Rating"
			},
			{
				value: "date_added",
				label: "Date added"
			},
			{
				value: "runtime",
				label: "Runtime"
			}
		], g = w(p.search), v;
		F(() => p.search, (e) => {
			e !== g.value.trim() && (g.value = e);
		});
		function x() {
			clearTimeout(v), v = setTimeout(() => {
				p.setSearch(g.value.trim()), u("change");
			}, a.searchDebounce);
		}
		function C() {
			g.value = "", p.setSearch(""), u("change");
		}
		let E = w(null), D = w(0), O = i(() => p.availableGenres.filter((e) => !p.selectedGenres.includes(e)));
		function j(e) {
			if (e == null || e === "") return;
			let t = String(e);
			p.selectedGenres.includes(t) || (p.setGenres([...p.selectedGenres, t]), u("change")), E.value = null, D.value++;
		}
		function M(e) {
			let t = p.selectedRatings;
			p.setRatings(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), u("change");
		}
		function I(e) {
			let t = p.selectedTypes;
			p.setTypes(t.includes(e) ? t.filter((t) => t !== e) : [...t, e]), u("change");
		}
		let V = i(() => {
			try {
				return (/* @__PURE__ */ new Date()).getFullYear();
			} catch {
				return 2025;
			}
		}), H = i(() => {
			let e = [];
			for (let t = V.value; t >= 1900; t--) e.push({
				value: t,
				label: String(t)
			});
			return e;
		});
		function U(e) {
			p.setYearRange(e == null || e === "" ? void 0 : Number(e), p.yearTo), u("change");
		}
		function ee(e) {
			p.setYearRange(p.yearFrom, e == null || e === "" ? void 0 : Number(e)), u("change");
		}
		function te(e) {
			p.setSort(e), u("change");
		}
		function W() {
			p.order = p.order === "asc" ? "desc" : "asc", p.offset = 0, u("change");
		}
		let G = i(() => {
			let e = [];
			return p.search && e.push({
				key: "search",
				label: `“${p.search}”`,
				remove: C
			}), p.selectedGenres.forEach((t) => e.push({
				key: `g:${t}`,
				label: t,
				remove: () => {
					p.setGenres(p.selectedGenres.filter((e) => e !== t)), u("change");
				}
			})), p.selectedRatings.forEach((t) => e.push({
				key: `r:${t}`,
				label: t,
				remove: () => M(t)
			})), p.selectedTypes.forEach((t) => e.push({
				key: `t:${t}`,
				label: t,
				remove: () => I(t)
			})), p.yearFrom !== void 0 && e.push({
				key: "yf",
				label: `From ${p.yearFrom}`,
				remove: () => U(null)
			}), p.yearTo !== void 0 && e.push({
				key: "yt",
				label: `To ${p.yearTo}`,
				remove: () => ee(null)
			}), e;
		}), K = i(() => G.value.length > 0), q = i(() => p.selectedGenres.length + p.selectedRatings.length + p.selectedTypes.length + (p.yearFrom === void 0 ? 0 : 1) + (p.yearTo === void 0 ? 0 : 1));
		function ne() {
			g.value = "", p.setSearch(""), p.setGenres([]), p.setRatings([]), p.setTypes([]), p.setYearRange(void 0, void 0), u("change");
		}
		let re = w(!1), ie = i(() => m.filterPresets), ae = w(!1), oe = w("");
		function se() {
			ae.value = !0, oe.value = "";
		}
		function ce() {
			let e = oe.value.trim();
			e && (m.saveFilterPreset(e, p.toQuery()), ae.value = !1, oe.value = "");
		}
		function le(e) {
			p.applyQuery(e.query), g.value = p.search, u("change");
		}
		function ue(e) {
			m.removeFilterPreset(e.id);
		}
		let de = w(!1);
		function fe() {
			typeof window > "u" || (de.value = window.scrollY > 24);
		}
		return b(() => {
			a.sticky && typeof window < "u" && (window.addEventListener("scroll", fe, { passive: !0 }), fe());
		}), y(() => {
			clearTimeout(v), typeof window < "u" && window.removeEventListener("scroll", fe);
		}), (r, i) => (S(), c("div", { class: _(["filterbar", {
			"is-sticky": t.sticky,
			"is-stuck": t.sticky && de.value
		}]) }, [
			l("div", qa, [
				l("label", Ja, [
					f(J, {
						name: "search",
						class: "filterbar__search-icon"
					}),
					R(l("input", {
						"onUpdate:modelValue": i[0] ||= (e) => g.value = e,
						type: "search",
						class: "filterbar__search-input",
						placeholder: "Search titles, people, genres…",
						"aria-label": "Search media",
						onInput: x
					}, null, 544), [[N, g.value]]),
					g.value ? (S(), c("button", {
						key: 0,
						type: "button",
						class: "filterbar__search-clear",
						"aria-label": "Clear search",
						onClick: C
					}, [f(J, { name: "x" })])) : s("", !0)
				]),
				l("div", Ya, [f(Wa, {
					"model-value": A(p).sort,
					options: h,
					label: "Sort by",
					"onUpdate:modelValue": te
				}, null, 8, ["model-value"]), l("button", {
					type: "button",
					class: "filterbar__order",
					"aria-label": `Sort ${A(p).order === "asc" ? "ascending" : "descending"}`,
					onClick: W
				}, [f(J, { name: A(p).order === "asc" ? "arrow-up" : "arrow-down" }, null, 8, ["name"])], 8, Xa)]),
				l("button", {
					type: "button",
					class: "filterbar__toggle",
					"aria-expanded": re.value,
					onClick: i[1] ||= (e) => re.value = !re.value
				}, [
					f(J, { name: "filter" }),
					i[4] ||= l("span", null, "Filters", -1),
					q.value ? (S(), o(Ka, {
						key: 0,
						class: "filterbar__toggle-badge"
					}, {
						default: L(() => [d(k(q.value), 1)]),
						_: 1
					})) : s("", !0),
					f(J, {
						name: re.value ? "chevron-up" : "chevron-down",
						class: "filterbar__toggle-caret"
					}, null, 8, ["name"])
				], 8, Za)
			]),
			f(n, { name: "filterbar-panel" }, {
				default: L(() => [R(l("div", Qa, [
					l("div", $a, [i[5] ||= l("span", { class: "filterbar__field-label" }, "Genres", -1), (S(), o(za, {
						key: D.value,
						"model-value": E.value,
						options: O.value,
						placeholder: "Add a genre…",
						"onUpdate:modelValue": j
					}, null, 8, ["model-value", "options"]))]),
					l("div", eo, [i[6] ||= l("span", { class: "filterbar__field-label" }, "Rating", -1), l("div", to, [(S(!0), c(e, null, T(A(p).availableRatings, (e) => (S(), o(Aa, {
						key: e,
						selected: A(p).selectedRatings.includes(e),
						"onUpdate:selected": (t) => M(e)
					}, {
						default: L(() => [d(k(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					l("div", no, [i[7] ||= l("span", { class: "filterbar__field-label" }, "Type", -1), l("div", ro, [(S(!0), c(e, null, T(A(p).availableTypes, (e) => (S(), o(Aa, {
						key: e,
						selected: A(p).selectedTypes.includes(e),
						"onUpdate:selected": (t) => I(e)
					}, {
						default: L(() => [d(k(e), 1)]),
						_: 2
					}, 1032, ["selected", "onUpdate:selected"]))), 128))])]),
					l("div", io, [i[9] ||= l("span", { class: "filterbar__field-label" }, "Year", -1), l("div", ao, [
						f(za, {
							"model-value": A(p).yearFrom ?? null,
							options: H.value,
							placeholder: "From",
							label: "Year from",
							"onUpdate:modelValue": U
						}, null, 8, ["model-value", "options"]),
						i[8] ||= l("span", {
							class: "filterbar__years-dash",
							"aria-hidden": "true"
						}, "–", -1),
						f(za, {
							"model-value": A(p).yearTo ?? null,
							options: H.value,
							placeholder: "To",
							label: "Year to",
							"onUpdate:modelValue": ee
						}, null, 8, ["model-value", "options"])
					])]),
					l("div", oo, [
						i[12] ||= l("span", { class: "filterbar__field-label" }, "Presets", -1),
						l("div", so, [(S(!0), c(e, null, T(ie.value, (e) => (S(), o(Aa, {
							key: e.id,
							removable: "",
							"remove-label": `Delete preset ${e.name}`,
							onClick: (t) => le(e),
							onRemove: (t) => ue(e)
						}, {
							default: L(() => [d(k(e.name), 1)]),
							_: 2
						}, 1032, [
							"remove-label",
							"onClick",
							"onRemove"
						]))), 128)), ie.value.length ? s("", !0) : (S(), c("span", co, "No saved presets"))]),
						ae.value ? (S(), c("div", lo, [R(l("input", {
							"onUpdate:modelValue": i[2] ||= (e) => oe.value = e,
							type: "text",
							class: "filterbar__preset-input",
							placeholder: "Preset name",
							"aria-label": "Preset name",
							onKeydown: [z(B(ce, ["prevent"]), ["enter"]), i[3] ||= z((e) => ae.value = !1, ["esc"])]
						}, null, 40, uo), [[N, oe.value]]), l("button", {
							type: "button",
							class: "filterbar__preset-confirm",
							onClick: ce
						}, [f(J, { name: "check" }), i[10] ||= d(" Save ", -1)])])) : (S(), c("button", {
							key: 1,
							type: "button",
							class: "filterbar__preset-add",
							disabled: !K.value,
							onClick: se
						}, [f(J, { name: "plus" }), i[11] ||= d(" Save current ", -1)], 8, fo))
					])
				], 512), [[P, re.value]])]),
				_: 1
			}),
			l("div", po, [l("span", mo, [l("b", null, k(A(p).total.toLocaleString()), 1), d(" " + k(A(p).total === 1 ? "title" : "titles"), 1)]), K.value ? (S(), c(e, { key: 0 }, [l("div", ho, [(S(!0), c(e, null, T(G.value, (e) => (S(), o(Aa, {
				key: e.key,
				removable: "",
				"remove-label": `Remove ${e.label}`,
				onRemove: e.remove
			}, {
				default: L(() => [d(k(e.label), 1)]),
				_: 2
			}, 1032, ["remove-label", "onRemove"]))), 128))]), l("button", {
				type: "button",
				class: "filterbar__clear",
				onClick: ne
			}, "Clear all")], 64)) : s("", !0)])
		], 2));
	}
}), [["__scopeId", "data-v-43a94d30"]]), _o = { class: "browse-page" }, vo = { class: "browse-toolbar" }, yo = { class: "browse-header" }, bo = { class: "browse-count numeric" }, xo = {
	key: 0,
	class: "browse-error",
	role: "alert"
}, So = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "BrowsePage",
	setup(t) {
		let n = m("apiBase", ""), r = i(() => typeof n == "string" ? n : n?.value ?? ""), a = m("phlixConfig", null), u = i(() => a?.homeRows ?? []), d = bi(), p = Ei(), h = Di(), g = K(), _ = w(null), v = C(/* @__PURE__ */ new Map());
		function y(e) {
			e.forEach((e) => v.set(e.id, e));
		}
		F(() => d.items, (e) => y(e), { immediate: !0 });
		let x = i(() => {
			let e = p.resumeMap;
			return Object.keys(e).map((e) => v.get(e)).filter((e) => !!e).sort((t, n) => (e[n.id] ?? 0) - (e[t.id] ?? 0)).slice(0, 12);
		});
		function D() {
			d.reset(), d.fetchMedia(r.value);
		}
		b(D), F(r, D);
		function O() {
			d.reset(), d.fetchMedia(r.value);
		}
		function j() {
			d.loadMore(r.value);
		}
		function M(e, t) {
			g?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function N(e) {
			M("player", e.id);
		}
		function P(e) {
			h.success(`Added "${e.name}" to your list`);
		}
		function I(e) {
			g?.hasRoute("media") ? M("media", e.id) : h.info(`Details for "${e.name}" are coming soon`);
		}
		function L() {
			return typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		}
		function R(e) {
			d.applyQuery(e.query ?? {}), D(), _.value?.scrollIntoView?.({
				behavior: L() ? "auto" : "smooth",
				block: "start"
			});
		}
		return (t, n) => (S(), c("div", _o, [
			l("div", vo, [E(t.$slots, "toolbar-extra", {}, void 0, !0)]),
			x.value.length ? (S(), o(Ca, {
				key: 0,
				title: "Continue Watching",
				items: x.value,
				"hide-when-empty": "",
				onPlay: N,
				onWatchlist: P,
				onInfo: I
			}, null, 8, ["items"])) : s("", !0),
			(S(!0), c(e, null, T(u.value, (e) => (S(), o(Ea, {
				key: e.id,
				row: e,
				"api-base": r.value,
				onItemsLoaded: y,
				onSeeAll: R,
				onPlay: N,
				onWatchlist: P,
				onInfo: I
			}, null, 8, ["row", "api-base"]))), 128)),
			l("section", {
				ref_key: "gridSection",
				ref: _,
				class: "browse-library"
			}, [
				l("div", yo, [n[0] ||= l("h1", { class: "browse-title" }, "Browse", -1), l("span", bo, k(A(d).total.toLocaleString()) + " titles", 1)]),
				f(go, { onChange: O }),
				A(d).error ? (S(), c("div", xo, [l("p", null, k(A(d).error), 1), l("button", {
					type: "button",
					class: "browse-retry",
					onClick: D
				}, "Retry")])) : s("", !0),
				f(oa, {
					items: A(d).items,
					loading: A(d).loading && A(d).items.length === 0,
					"loading-more": A(d).loading && A(d).items.length > 0,
					"has-more": A(d).hasMore,
					onLoadMore: j,
					onPlay: N,
					onWatchlist: P,
					onInfo: I
				}, null, 8, [
					"items",
					"loading",
					"loading-more",
					"has-more"
				])
			], 512)
		]));
	}
}), [["__scopeId", "data-v-214269cb"]]), Co = [
	"type",
	"disabled",
	"aria-busy"
], wo = {
	key: 0,
	class: "phlix-btn__spinner"
}, To = { class: "phlix-btn__label" }, Eo = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Button",
	props: {
		variant: { default: "solid" },
		size: { default: "md" },
		type: { default: "button" },
		loading: {
			type: Boolean,
			default: !1
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		block: {
			type: Boolean,
			default: !1
		},
		leftIcon: {},
		rightIcon: {}
	},
	setup(e) {
		let t = e, n = i(() => t.disabled || t.loading);
		return (t, r) => (S(), c("button", {
			type: e.type,
			class: _(["phlix-btn", [
				`phlix-btn--${e.variant}`,
				`phlix-btn--${e.size}`,
				{
					"phlix-btn--block": e.block,
					"is-loading": e.loading
				}
			]]),
			disabled: n.value,
			"aria-busy": e.loading || void 0
		}, [
			e.loading ? (S(), c("span", wo, [f(J, { name: "spinner" })])) : s("", !0),
			e.leftIcon && !e.loading ? (S(), o(J, {
				key: 1,
				name: e.leftIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : s("", !0),
			l("span", To, [E(t.$slots, "default", {}, void 0, !0)]),
			e.rightIcon ? (S(), o(J, {
				key: 2,
				name: e.rightIcon,
				class: "phlix-btn__icon"
			}, null, 8, ["name"])) : s("", !0)
		], 10, Co));
	}
}), [["__scopeId", "data-v-8cdee95a"]]), Do = { class: "media-detail" }, Oo = { class: "media-detail__bar" }, ko = { class: "media-detail__hero" }, Ao = { class: "media-detail__poster" }, jo = ["src", "alt"], Mo = {
	key: 1,
	class: "media-detail__fallback",
	"aria-hidden": "true"
}, No = { class: "media-detail__info" }, Po = { class: "media-detail__title" }, Fo = { class: "media-detail__meta numeric" }, Io = {
	key: 0,
	class: "media-detail__meta-item"
}, Lo = {
	key: 1,
	class: "media-detail__cert"
}, Ro = {
	key: 2,
	class: "media-detail__meta-item"
}, zo = { class: "media-detail__type" }, Bo = {
	key: 0,
	class: "media-detail__genres"
}, Vo = { class: "media-detail__overview" }, Ho = { class: "media-detail__actions" }, Uo = { class: "media-detail__resume-at numeric" }, Wo = {
	key: 1,
	class: "media-detail__credits"
}, Go = {
	key: 0,
	class: "media-detail__credit"
}, Ko = {
	key: 1,
	class: "media-detail__credit"
}, qo = { class: "media-detail__cast" }, Jo = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "MediaDetail",
	props: {
		item: {},
		resumeSeconds: { default: null },
		similar: { default: () => [] },
		similarLoading: {
			type: Boolean,
			default: !1
		},
		showBack: {
			type: Boolean,
			default: !0
		}
	},
	emits: [
		"play",
		"resume",
		"watchlist",
		"info",
		"back"
	],
	setup(t, { emit: n }) {
		let r = t, a = n, u = i(() => r.item.type === "audio" ? "music" : r.item.type === "image" ? "image" : r.item.type === "series" ? "tv" : "film"), p = i(() => r.item.actors?.slice(0, 8) ?? []), m = i(() => {
			let e = r.resumeSeconds;
			if (!e || e <= 0) return null;
			let t = Math.floor(e / 3600), n = Math.floor(e % 3600 / 60), i = Math.floor(e % 60), a = t > 0 ? String(n).padStart(2, "0") : String(n);
			return `${t > 0 ? `${t}:` : ""}${a}:${String(i).padStart(2, "0")}`;
		}), h = w(!1), g = w(null);
		function y() {
			h.value = !0;
		}
		return b(() => {
			g.value?.complete && (h.value = !0);
		}), (n, r) => (S(), c("article", Do, [
			t.item.poster_url ? (S(), c("div", {
				key: 0,
				class: "media-detail__ambient",
				style: v({ backgroundImage: `url(${t.item.poster_url})` }),
				"aria-hidden": "true"
			}, null, 4)) : s("", !0),
			l("div", Oo, [t.showBack ? (S(), o(Eo, {
				key: 0,
				variant: "ghost",
				size: "sm",
				"left-icon": "arrow-left",
				onClick: r[0] ||= (e) => a("back")
			}, {
				default: L(() => [...r[7] ||= [d("Back", -1)]]),
				_: 1
			})) : s("", !0)]),
			l("div", ko, [l("div", Ao, [t.item.poster_url ? (S(), c("img", {
				key: 0,
				ref_key: "imgEl",
				ref: g,
				class: _(["media-detail__img", { "is-loaded": h.value }]),
				src: t.item.poster_url,
				alt: t.item.name,
				decoding: "async",
				onLoad: y
			}, null, 42, jo)) : (S(), c("div", Mo, [f(J, { name: u.value }, null, 8, ["name"])]))]), l("div", No, [
				l("h1", Po, k(t.item.name), 1),
				l("div", Fo, [
					t.item.year ? (S(), c("span", Io, [f(J, {
						name: "calendar",
						class: "media-detail__meta-icon"
					}), d(k(t.item.year), 1)])) : s("", !0),
					t.item.rating ? (S(), c("span", Lo, k(t.item.rating), 1)) : s("", !0),
					t.item.runtime ? (S(), c("span", Ro, k(t.item.runtime) + "m", 1)) : s("", !0),
					l("span", zo, k(t.item.type), 1)
				]),
				t.item.genres?.length ? (S(), c("div", Bo, [(S(!0), c(e, null, T(t.item.genres, (e) => (S(), o(Aa, {
					key: e,
					size: "sm"
				}, {
					default: L(() => [d(k(e), 1)]),
					_: 2
				}, 1024))), 128))])) : s("", !0),
				l("p", Vo, k(t.item.overview || "No overview available."), 1),
				l("div", Ho, [
					f(Eo, {
						variant: "solid",
						"left-icon": "play",
						onClick: r[1] ||= (e) => a("play", t.item)
					}, {
						default: L(() => [...r[8] ||= [d("Play", -1)]]),
						_: 1
					}),
					m.value ? (S(), o(Eo, {
						key: 0,
						variant: "outline",
						"left-icon": "rewind",
						onClick: r[2] ||= (e) => a("resume", t.item)
					}, {
						default: L(() => [r[9] ||= d(" Resume ", -1), l("span", Uo, k(m.value), 1)]),
						_: 1
					})) : s("", !0),
					f(Eo, {
						variant: "ghost",
						"left-icon": "bookmark-plus",
						onClick: r[3] ||= (e) => a("watchlist", t.item)
					}, {
						default: L(() => [...r[10] ||= [d("Watchlist", -1)]]),
						_: 1
					})
				]),
				t.item.director || p.value.length ? (S(), c("dl", Wo, [t.item.director ? (S(), c("div", Go, [r[11] ||= l("dt", null, "Director", -1), l("dd", null, k(t.item.director), 1)])) : s("", !0), p.value.length ? (S(), c("div", Ko, [r[12] ||= l("dt", null, "Cast", -1), l("dd", qo, [(S(!0), c(e, null, T(p.value, (e) => (S(), o(Aa, {
					key: e,
					size: "sm",
					icon: "user"
				}, {
					default: L(() => [d(k(e), 1)]),
					_: 2
				}, 1024))), 128))])])) : s("", !0)])) : s("", !0)
			])]),
			t.similarLoading || t.similar.length ? (S(), o(Ca, {
				key: 1,
				class: "media-detail__similar",
				title: "More like this",
				items: t.similar,
				loading: t.similarLoading,
				"hide-when-empty": "",
				onPlay: r[4] ||= (e) => a("play", e),
				onWatchlist: r[5] ||= (e) => a("watchlist", e),
				onInfo: r[6] ||= (e) => a("info", e)
			}, null, 8, ["items", "loading"])) : s("", !0)
		]));
	}
}), [["__scopeId", "data-v-379d2165"]]), Yo = { class: "media-detail-page" }, Xo = {
	key: 0,
	class: "media-detail-page__loading",
	role: "status",
	"aria-busy": "true",
	"aria-label": "Loading title"
}, Zo = { class: "media-detail-page__loading-hero" }, Qo = { class: "media-detail-page__loading-info" }, $o = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "MediaDetailPage",
	setup(e) {
		let t = m("apiBase", ""), n = i(() => typeof t == "string" ? t : t?.value ?? ""), r = G(), a = K(), u = Ei(), p = Di(), h = w(null), g = w([]), _ = w(!0), v = w(!1), x = w(null), C = i(() => String(r.params.id ?? "")), T = i(() => u.resumePositionFor(C.value)), E = null, D = !1;
		function O(e) {
			return typeof e == "object" && !!e && e.name === "AbortError";
		}
		async function k(e, t) {
			let r = t.genres?.[0];
			if (!r) {
				g.value = [];
				return;
			}
			let i = E, a = () => D || i !== E;
			v.value = !0;
			try {
				let o = Ta(n.value, {
					genres: [r],
					limit: 13,
					sort: "rating",
					order: "desc"
				}), s = await e.get(o, void 0, i?.signal);
				if (a()) return;
				g.value = (s.items ?? []).filter((e) => e.id !== t.id).slice(0, 12);
			} catch (e) {
				if (a() || O(e)) return;
				g.value = [];
			} finally {
				a() || (v.value = !1);
			}
		}
		async function A() {
			let e = C.value;
			if (E?.abort(), E = typeof AbortController < "u" ? new AbortController() : null, _.value = !0, x.value = null, g.value = [], !e) {
				x.value = "No media id provided", _.value = !1;
				return;
			}
			try {
				let t = new X({ baseUrl: n.value }), r = await t.get(`/api/v1/media/${encodeURIComponent(e)}`, void 0, E?.signal);
				if (D) return;
				h.value = r, _.value = !1, k(t, r);
			} catch (e) {
				if (D || O(e)) return;
				x.value = e instanceof Error ? e.message : "Failed to load title", _.value = !1;
			}
		}
		b(A), F(C, A), y(() => {
			D = !0, E?.abort(), E = null;
		});
		function j(e, t) {
			a?.push({
				name: e,
				params: { id: t }
			}).catch(() => {});
		}
		function M(e) {
			j("player", e.id);
		}
		function N(e) {
			p.success(`Added "${e.name}" to your list`);
		}
		function P(e) {
			j("media", e.id);
		}
		function I() {
			a?.back();
		}
		return (e, t) => (S(), c("div", Yo, [_.value ? (S(), c("div", Xo, [l("div", Zo, [f(Q, {
			variant: "rect",
			radius: "var(--radius-lg)",
			height: "420px"
		}), l("div", Qo, [
			f(Q, {
				variant: "text",
				width: "60%",
				height: "2rem"
			}),
			f(Q, {
				variant: "text",
				lines: 4
			}),
			f(Q, {
				variant: "rect",
				width: "9rem",
				height: "2.5rem",
				radius: "var(--radius-md)"
			})
		])])])) : x.value ? (S(), o(fa, {
			key: 1,
			icon: "alert",
			title: "Couldn't load this title",
			description: x.value
		}, {
			actions: L(() => [f(Eo, {
				variant: "solid",
				onClick: A
			}, {
				default: L(() => [...t[0] ||= [d("Retry", -1)]]),
				_: 1
			}), f(Eo, {
				variant: "ghost",
				onClick: I
			}, {
				default: L(() => [...t[1] ||= [d("Back", -1)]]),
				_: 1
			})]),
			_: 1
		}, 8, ["description"])) : h.value ? (S(), o(Jo, {
			key: 2,
			item: h.value,
			"resume-seconds": T.value,
			similar: g.value,
			"similar-loading": v.value,
			onPlay: M,
			onResume: M,
			onWatchlist: N,
			onInfo: P,
			onBack: I
		}, null, 8, [
			"item",
			"resume-seconds",
			"similar",
			"similar-loading"
		])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-e2da3e19"]]), es = ["src", "poster"], ts = { class: "controls-top" }, ns = { class: "media-title" }, rs = {
	key: 0,
	class: "media-year"
}, is = { class: "controls-center" }, as = { class: "controls-bottom" }, os = { class: "progress-track" }, ss = { class: "controls-row" }, cs = { class: "time-display" }, ls = { class: "volume-control" }, us = ["value"], ds = { class: "speed-control" }, fs = ["value"], ps = { class: "time-display" }, ms = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Player",
	props: {
		media: {},
		streamUrl: {}
	},
	setup(e) {
		let t = w(null), n = w(!1), r = w(0), a = w(0), o = w(1), d = w(!1), f = w(1), p = w(!1), m = w(!0), h = null, g = i(() => a.value > 0 ? r.value / a.value * 100 : 0);
		function y(e) {
			return !isFinite(e) || isNaN(e) ? "0:00" : `${Math.floor(e / 60)}:${Math.floor(e % 60).toString().padStart(2, "0")}`;
		}
		function b() {
			t.value && (n.value ? t.value.pause() : t.value.play());
		}
		function C() {
			t.value && (r.value = t.value.currentTime);
		}
		function T() {
			t.value && (a.value = t.value.duration);
		}
		function E(e) {
			let n = e.currentTarget.getBoundingClientRect(), r = (e.clientX - n.left) / n.width;
			t.value && (t.value.currentTime = r * a.value);
		}
		function D(e) {
			let n = parseFloat(e.target.value);
			o.value = n, t.value && (t.value.volume = n), d.value = n === 0;
		}
		function O() {
			d.value = !d.value, t.value && (t.value.muted = d.value);
		}
		function A(e) {
			f.value = e, t.value && (t.value.playbackRate = e);
		}
		function j() {
			let e = t.value?.closest(".player-container");
			e && (document.fullscreenElement ? (document.exitFullscreen(), p.value = !1) : (e.requestFullscreen(), p.value = !0));
		}
		function M() {
			m.value = !0, h && clearTimeout(h), h = setTimeout(() => {
				n.value && (m.value = !1);
			}, 3e3);
		}
		return x(() => {
			h && clearTimeout(h);
		}), (i, h) => (S(), c("div", {
			class: _(["player-container", { "controls-hidden": !m.value && n.value }]),
			onMousemove: M,
			onClick: b
		}, [
			h[6] ||= l("div", { class: "player-overlay" }, null, -1),
			l("video", {
				ref_key: "videoRef",
				ref: t,
				class: "player-video",
				src: e.streamUrl,
				poster: e.media.poster_url ?? void 0,
				preload: "metadata",
				onPlay: h[0] ||= (e) => n.value = !0,
				onPause: h[1] ||= (e) => n.value = !1,
				onTimeupdate: C,
				onLoadedmetadata: T,
				onClick: B(b, ["stop"])
			}, null, 40, es),
			l("div", {
				class: "player-controls",
				onClick: h[4] ||= B(() => {}, ["stop"])
			}, [
				l("div", ts, [
					l("button", {
						class: "ctrl-btn back-btn",
						onClick: h[2] ||= (e) => i.$router.back()
					}, " ← Back "),
					l("span", ns, k(e.media.name), 1),
					e.media.year ? (S(), c("span", rs, k(e.media.year), 1)) : s("", !0)
				]),
				l("div", is, [l("button", {
					class: "play-btn",
					onClick: b
				}, k(n.value ? "❚❚" : "▶"), 1)]),
				l("div", as, [l("div", {
					class: "progress-bar",
					onClick: E
				}, [l("div", os, [l("div", {
					class: "progress-fill",
					style: v({ width: g.value + "%" })
				}, null, 4)])]), l("div", ss, [
					l("span", cs, k(y(r.value)), 1),
					l("div", ls, [l("button", {
						class: "ctrl-btn",
						onClick: O
					}, k(d.value || o.value === 0 ? "🔇" : "🔊"), 1), l("input", {
						type: "range",
						min: "0",
						max: "1",
						step: "0.05",
						value: d.value ? 0 : o.value,
						class: "volume-slider",
						onInput: D
					}, null, 40, us)]),
					l("div", ds, [l("select", {
						class: "speed-select",
						value: f.value,
						onChange: h[3] ||= (e) => A(Number(e.target.value))
					}, [...h[5] ||= [u("<option value=\"0.5\" data-v-7a51063f>0.5×</option><option value=\"0.75\" data-v-7a51063f>0.75×</option><option value=\"1\" data-v-7a51063f>1×</option><option value=\"1.25\" data-v-7a51063f>1.25×</option><option value=\"1.5\" data-v-7a51063f>1.5×</option><option value=\"2\" data-v-7a51063f>2×</option>", 6)]], 40, fs)]),
					l("span", ps, k(y(a.value)), 1),
					l("button", {
						class: "ctrl-btn",
						onClick: j
					}, k(p.value ? "⤓" : "⤢"), 1)
				])])
			])
		], 34));
	}
}), [["__scopeId", "data-v-7a51063f"]]), hs = { class: "player-page" }, gs = {
	key: 0,
	class: "player-loading"
}, _s = {
	key: 1,
	class: "player-error"
}, vs = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "PlayerPage",
	setup(e) {
		let t = m("apiBase", i(() => "")), n = G(), r = w(null), a = w(""), u = w(!0), d = w(null);
		async function f() {
			let e = n.params.id;
			if (!e) {
				d.value = "No media ID provided", u.value = !1;
				return;
			}
			try {
				let n = new X({ baseUrl: t.value }), [i, o] = await Promise.all([n.get(`/api/v1/media/${e}`), n.get(`/api/v1/media/${e}/playback-info`).catch(() => null)]);
				r.value = i, o?.url ? a.value = o.url : a.value = `${t.value}/media/${e}/stream`;
			} catch (e) {
				d.value = e instanceof Error ? e.message : "Failed to load media";
			} finally {
				u.value = !1;
			}
		}
		return b(f), (e, t) => (S(), c("div", hs, [u.value ? (S(), c("div", gs, "Loading...")) : d.value ? (S(), c("div", _s, [l("p", null, k(d.value), 1), l("button", {
			class: "retry-btn",
			onClick: f
		}, "Retry")])) : r.value ? (S(), o(ms, {
			key: 2,
			media: r.value,
			"stream-url": a.value
		}, null, 8, ["media", "stream-url"])) : s("", !0)]));
	}
}), [["__scopeId", "data-v-d9061b47"]]), ys = "access_token", bs = "refresh_token", xs = "user", Ss = class {
	storage;
	constructor(e = window.localStorage) {
		this.storage = e;
	}
	getAccessToken() {
		return this.storage.getItem(ys);
	}
	setAccessToken(e) {
		this.storage.setItem(ys, e);
	}
	getRefreshToken() {
		return this.storage.getItem(bs);
	}
	setRefreshToken(e) {
		this.storage.setItem(bs, e);
	}
	getUser() {
		let e = this.storage.getItem(xs);
		if (e === null) return null;
		try {
			return JSON.parse(e);
		} catch {
			return null;
		}
	}
	setUser(e) {
		this.storage.setItem(xs, JSON.stringify(e));
	}
	clear() {
		this.storage.removeItem(ys), this.storage.removeItem(bs), this.storage.removeItem(xs);
	}
}, Cs = H("auth", () => {
	let e = new Ss(), t = new X({
		tokenStore: e,
		baseUrl: m("apiBase", "")
	}), n = w(null), r = w(!1), a = w(null), o = w(e.getAccessToken()), s = i(() => o.value !== null), c = i(() => n.value?.is_admin === !0);
	function l(t, n) {
		e.setAccessToken(t), e.setRefreshToken(n), o.value = t;
	}
	async function u(e, n) {
		r.value = !0, a.value = null;
		try {
			let r = await t.post("/api/v1/auth/login", {
				email: e,
				password: n
			});
			return l(r.access_token, r.refresh_token), await f(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Login failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function d(e, n, i) {
		r.value = !0, a.value = null;
		try {
			let r = await t.post("/api/v1/auth/register", {
				email: e,
				username: n,
				password: i
			});
			return l(r.access_token, r.refresh_token), await f(), !0;
		} catch (e) {
			return a.value = e instanceof Error ? e.message : "Registration failed", !1;
		} finally {
			r.value = !1;
		}
	}
	async function f() {
		if (s.value) try {
			n.value = await t.getCurrentUser();
		} catch {
			n.value = null, e.clear(), o.value = null;
		}
	}
	function p() {
		e.clear(), o.value = null, n.value = null;
	}
	return {
		user: n,
		loading: r,
		error: a,
		isLoggedIn: s,
		isAdmin: c,
		client: t,
		login: u,
		signup: d,
		fetchUser: f,
		logout: p
	};
}), ws = {
	key: 0,
	class: "form-error"
}, Ts = { class: "field" }, Es = { class: "field" }, Ds = { class: "password-wrapper" }, Os = ["type"], ks = ["disabled"], As = { class: "form-footer" }, js = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "LoginForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Cs(), i = K(), a = w(""), o = w(""), u = w(!1);
		async function p() {
			await r.login(a.value, o.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = D("router-link");
			return S(), c("form", {
				class: "login-form",
				onSubmit: B(p, ["prevent"])
			}, [
				t[7] ||= l("h2", { class: "form-title" }, "Sign in to Phlix", -1),
				A(r).error ? (S(), c("div", ws, k(A(r).error), 1)) : s("", !0),
				l("div", Ts, [t[3] ||= l("label", {
					for: "email",
					class: "label"
				}, "Email", -1), R(l("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[N, a.value]])]),
				l("div", Es, [t[4] ||= l("label", {
					for: "password",
					class: "label"
				}, "Password", -1), l("div", Ds, [R(l("input", {
					id: "password",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: u.value ? "text" : "password",
					class: "input",
					placeholder: "Your password",
					required: "",
					autocomplete: "current-password"
				}, null, 8, Os), [[M, o.value]]), l("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[2] ||= (e) => u.value = !u.value
				}, k(u.value ? "🙈" : "👁"), 1)])]),
				l("button", {
					type: "submit",
					class: "submit-btn",
					disabled: A(r).loading
				}, k(A(r).loading ? "Signing in..." : "Sign in"), 9, ks),
				l("p", As, [t[6] ||= d(" Don't have an account? ", -1), f(n, {
					to: "/app/signup",
					class: "link"
				}, {
					default: L(() => [...t[5] ||= [d("Sign up", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-22bc5576"]]), Ms = { class: "auth-page" }, Ns = { class: "auth-card" }, Ps = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "LoginPage",
	setup(e) {
		return (e, t) => (S(), c("div", Ms, [l("div", Ns, [f(js, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-9c53ce6a"]]), Fs = {
	key: 0,
	class: "form-error"
}, Is = { class: "field" }, Ls = { class: "field" }, Rs = { class: "field" }, zs = { class: "password-wrapper" }, Bs = ["type"], Vs = { class: "field" }, Hs = ["type"], Us = ["disabled"], Ws = { class: "form-footer" }, Gs = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "SignupForm",
	emits: ["success"],
	setup(e, { emit: t }) {
		let n = t, r = Cs(), i = K(), a = w(""), o = w(""), u = w(""), p = w(""), m = w(!1), h = w(null);
		async function g() {
			if (h.value = null, u.value.length < 8) {
				h.value = "Password must be at least 8 characters.";
				return;
			}
			if (u.value !== p.value) {
				h.value = "Passwords do not match.";
				return;
			}
			await r.signup(a.value, o.value, u.value) && (n("success"), i.push("/app"));
		}
		return (e, t) => {
			let n = D("router-link");
			return S(), c("form", {
				class: "signup-form",
				onSubmit: B(g, ["prevent"])
			}, [
				t[11] ||= l("h2", { class: "form-title" }, "Create your Phlix account", -1),
				A(r).error || h.value ? (S(), c("div", Fs, k(A(r).error || h.value), 1)) : s("", !0),
				l("div", Is, [t[5] ||= l("label", {
					for: "email",
					class: "label"
				}, "Email", -1), R(l("input", {
					id: "email",
					"onUpdate:modelValue": t[0] ||= (e) => a.value = e,
					type: "email",
					class: "input",
					placeholder: "you@example.com",
					required: "",
					autocomplete: "email"
				}, null, 512), [[N, a.value]])]),
				l("div", Ls, [t[6] ||= l("label", {
					for: "username",
					class: "label"
				}, "Username", -1), R(l("input", {
					id: "username",
					"onUpdate:modelValue": t[1] ||= (e) => o.value = e,
					type: "text",
					class: "input",
					placeholder: "Your username",
					required: "",
					autocomplete: "username",
					minlength: "3"
				}, null, 512), [[N, o.value]])]),
				l("div", Rs, [t[7] ||= l("label", {
					for: "password",
					class: "label"
				}, "Password", -1), l("div", zs, [R(l("input", {
					id: "password",
					"onUpdate:modelValue": t[2] ||= (e) => u.value = e,
					type: m.value ? "text" : "password",
					class: "input",
					placeholder: "At least 8 characters",
					required: "",
					autocomplete: "new-password",
					minlength: "8"
				}, null, 8, Bs), [[M, u.value]]), l("button", {
					type: "button",
					class: "toggle-password",
					onClick: t[3] ||= (e) => m.value = !m.value
				}, k(m.value ? "🙈" : "👁"), 1)])]),
				l("div", Vs, [t[8] ||= l("label", {
					for: "confirm",
					class: "label"
				}, "Confirm password", -1), R(l("input", {
					id: "confirm",
					"onUpdate:modelValue": t[4] ||= (e) => p.value = e,
					type: m.value ? "text" : "password",
					class: "input",
					placeholder: "Repeat your password",
					required: "",
					autocomplete: "new-password"
				}, null, 8, Hs), [[M, p.value]])]),
				l("button", {
					type: "submit",
					class: "submit-btn",
					disabled: A(r).loading
				}, k(A(r).loading ? "Creating account..." : "Create account"), 9, Us),
				l("p", Ws, [t[10] ||= d(" Already have an account? ", -1), f(n, {
					to: "/app/login",
					class: "link"
				}, {
					default: L(() => [...t[9] ||= [d("Sign in", -1)]]),
					_: 1
				})])
			], 32);
		};
	}
}), [["__scopeId", "data-v-d5e42c72"]]), Ks = { class: "auth-page" }, qs = { class: "auth-card" }, Js = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "SignupPage",
	setup(e) {
		return (e, t) => (S(), c("div", Ks, [l("div", qs, [f(Gs, { onSuccess: () => {} })])]));
	}
}), [["__scopeId", "data-v-609331e4"]]), Ys = { class: "settings-form" }, Xs = {
	key: 0,
	class: "settings-loading"
}, Zs = {
	key: 1,
	class: "settings-error"
}, Qs = { class: "group-title" }, $s = ["for"], ec = { class: "setting-control" }, tc = [
	"id",
	"checked",
	"onChange"
], nc = [
	"id",
	"value",
	"onChange"
], rc = [
	"id",
	"value",
	"onChange"
], ic = { class: "settings-actions" }, ac = {
	key: 0,
	class: "success-msg"
}, oc = ["disabled"], sc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "SettingsForm",
	props: { groups: {} },
	emits: ["saved"],
	setup(t, { emit: n }) {
		let r = t, a = n, o = Cs(), u = w({}), d = w(!0), f = w(!1), p = w(null), m = w(null), h = [
			"transcoding",
			"metadata",
			"markers",
			"subtitles",
			"discovery",
			"trickplay",
			"newsletter",
			"port-forward",
			"scrobblers"
		], g = i(() => r.groups ? h.filter((e) => r.groups.includes(e)) : h);
		async function _() {
			d.value = !0, p.value = null;
			try {
				u.value = await o.client.get("/api/v1/users/me/settings");
			} catch (e) {
				p.value = e instanceof Error ? e.message : "Failed to load settings";
			} finally {
				d.value = !1;
			}
		}
		async function v() {
			f.value = !0, p.value = null, m.value = null;
			try {
				await o.client.put("/api/v1/users/me/settings", u.value), m.value = "Settings saved.", a("saved", u.value), setTimeout(() => {
					m.value = null;
				}, 3e3);
			} catch (e) {
				p.value = e instanceof Error ? e.message : "Failed to save settings";
			} finally {
				f.value = !1;
			}
		}
		function y(e, t) {
			u.value[e] = t;
		}
		b(_);
		let x = {
			transcoding: "Transcoding",
			metadata: "Metadata",
			markers: "Marker Detection",
			subtitles: "Subtitles",
			discovery: "Discovery",
			trickplay: "Trickplay",
			newsletter: "Newsletter",
			"port-forward": "Port Forwarding",
			scrobblers: "Scrobblers"
		}, C = {
			"hwaccel.enabled": {
				label: "Hardware acceleration",
				type: "bool"
			},
			"hwaccel.prefer_hardware": {
				label: "Prefer hardware encoding",
				type: "bool"
			},
			"hwaccel.probe_timeout": {
				label: "HW probe timeout (s)",
				type: "number"
			},
			"tmdb.api_key": {
				label: "TMDB API Key",
				type: "string"
			},
			"marker_detection.similarity_threshold": {
				label: "Intro similarity threshold",
				type: "number"
			},
			"marker_detection.intro_max_duration": {
				label: "Max intro duration (s)",
				type: "number"
			},
			"subtitles.enabled": {
				label: "Enable subtitles",
				type: "bool"
			},
			"subtitles.default_language": {
				label: "Default subtitle language",
				type: "string"
			},
			"subtitles.burn_in_by_default": {
				label: "Burn in subtitles by default",
				type: "bool"
			},
			"discovery.discovery_port": {
				label: "Discovery port",
				type: "number"
			},
			"trickplay.enabled": {
				label: "Enable trickplay",
				type: "bool"
			},
			"trickplay.interval_seconds": {
				label: "Trickplay interval (s)",
				type: "number"
			},
			"newsletter.enabled": {
				label: "Enable newsletter",
				type: "bool"
			},
			"newsletter.send_hour": {
				label: "Newsletter send hour",
				type: "number"
			},
			"port-forward.port_forwarding.upnp_enabled": {
				label: "Enable UPnP",
				type: "bool"
			},
			"trakt.client_id": {
				label: "Trakt client ID",
				type: "string"
			},
			"trakt.client_secret": {
				label: "Trakt client secret",
				type: "string"
			},
			"trakt.redirect_uri": {
				label: "Trakt redirect URI",
				type: "string"
			}
		};
		return (t, n) => (S(), c("div", Ys, [d.value ? (S(), c("div", Xs, "Loading settings...")) : p.value ? (S(), c("div", Zs, k(p.value), 1)) : (S(), c(e, { key: 2 }, [(S(!0), c(e, null, T(g.value, (t) => (S(), c("div", {
			key: t,
			class: "settings-group"
		}, [l("h3", Qs, k(x[t]), 1), (S(), c(e, null, T(C, (e, n) => R(l("div", {
			key: n,
			class: "setting-row"
		}, [l("label", {
			for: n,
			class: "setting-label"
		}, k(e.label), 9, $s), l("div", ec, [e.type === "bool" ? (S(), c("input", {
			key: 0,
			id: n,
			type: "checkbox",
			class: "toggle",
			checked: !!u.value[n],
			onChange: (e) => y(n, e.target.checked)
		}, null, 40, tc)) : e.type === "number" ? (S(), c("input", {
			key: 1,
			id: n,
			type: "number",
			class: "input number-input",
			value: u.value[n],
			onChange: (e) => y(n, Number(e.target.value))
		}, null, 40, nc)) : (S(), c("input", {
			key: 2,
			id: n,
			type: "text",
			class: "input",
			value: u.value[n] ?? "",
			onChange: (e) => y(n, e.target.value)
		}, null, 40, rc))])]), [[P, n.startsWith(t)]])), 64))]))), 128)), l("div", ic, [m.value ? (S(), c("div", ac, k(m.value), 1)) : s("", !0), l("button", {
			class: "save-btn",
			disabled: f.value,
			onClick: v
		}, k(f.value ? "Saving..." : "Save settings"), 9, oc)])], 64))]));
	}
}), [["__scopeId", "data-v-51b588b6"]]), cc = { class: "settings-page" }, lc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "SettingsPage",
	setup(e) {
		return (e, t) => (S(), c("div", cc, [t[0] ||= l("div", { class: "settings-header" }, [l("h1", { class: "settings-title" }, "Settings")], -1), f(sc)]));
	}
}), [["__scopeId", "data-v-f9ca8a28"]]);
//#endregion
//#region src/app/createPhlixApp.ts
function uc() {
	return typeof window < "u" && window.__PHLIX__ ? window.__PHLIX__ : {
		app: "server",
		apiBase: "",
		routerBase: "/app",
		menu: [],
		extraRoutes: [],
		features: {}
	};
}
function dc(e) {
	let t = e.routerBase || "/app", n = [
		{
			path: `${t}/`,
			redirect: t
		},
		{
			path: t,
			name: "browse",
			component: So
		},
		{
			path: `${t}/media/:id`,
			name: "media",
			component: $o
		},
		{
			path: `${t}/player/:id`,
			name: "player",
			component: vs
		},
		{
			path: `${t}/login`,
			name: "login",
			component: Ps
		},
		{
			path: `${t}/signup`,
			name: "signup",
			component: Js
		},
		{
			path: `${t}/settings`,
			name: "settings",
			component: lc
		}
	];
	return e.extraRoutes && n.push(...e.extraRoutes), n.push({
		path: `${t}/:pathMatch(.*)*`,
		name: "catchall",
		component: mi,
		props: { appName: e.app }
	}), n;
}
function fc(e) {
	let t = {
		...uc(),
		...e
	};
	ai(t.defaultTheme);
	let n = V();
	t.defaultTheme && !Lr() && (Y(n).theme = t.defaultTheme);
	let r = te({
		history: W(t.routerBase || "/app"),
		routes: dc(t)
	}), i = a(di);
	return i.provide("apiBase", t.apiBase), i.provide("phlixCommands", t.commands ?? []), i.provide("phlixConfig", t), i.use(n), i.use(r), i;
}
//#endregion
//#region src/components/AppBackdrop.vue?vue&type=script&setup=true&lang.ts
var pc = {
	key: 1,
	class: "phlix-backdrop__vignette",
	"aria-hidden": "true"
}, mc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "AppBackdrop",
	props: {
		enabled: {
			type: Boolean,
			default: !0
		},
		grain: {
			type: Boolean,
			default: !0
		},
		vignette: {
			type: Boolean,
			default: !0
		},
		ambient: {
			type: Boolean,
			default: !1
		},
		ambientColor: {},
		ambientImage: {},
		intensity: { default: 1 }
	},
	setup(t) {
		let n = t, r = w(!1), a = null, o = null, l = () => r.value = !!(a?.matches || o?.matches);
		b(() => {
			typeof window > "u" || typeof window.matchMedia != "function" || (a = window.matchMedia("(prefers-reduced-motion: reduce)"), o = window.matchMedia("(prefers-reduced-data: reduce)"), l(), a.addEventListener?.("change", l), o.addEventListener?.("change", l));
		}), y(() => {
			a?.removeEventListener?.("change", l), o?.removeEventListener?.("change", l);
		});
		let u = i(() => n.enabled && !r.value), d = i(() => u.value && n.ambient && !!(n.ambientColor || n.ambientImage));
		function f(e) {
			return encodeURI(e).replace(/["'()\s]/g, (e) => `%${e.charCodeAt(0).toString(16)}`);
		}
		let p = i(() => n.ambientImage ? {
			backgroundImage: `url("${f(n.ambientImage)}")`,
			opacity: String(.55 * n.intensity)
		} : {
			background: `radial-gradient(60% 60% at 25% 12%, ${n.ambientColor}, transparent 70%),
                 radial-gradient(55% 55% at 85% 8%, color-mix(in srgb, ${n.ambientColor} 55%, transparent), transparent 70%)`,
			opacity: String(.85 * n.intensity)
		}), m = i(() => ({ opacity: `calc(var(--grain-opacity) * ${n.intensity})` }));
		return (n, r) => (S(), c(e, null, [
			d.value ? (S(), c("div", {
				key: 0,
				class: _(["phlix-backdrop__ambient", { "is-image": !!t.ambientImage }]),
				style: v(p.value),
				"aria-hidden": "true"
			}, null, 6)) : s("", !0),
			u.value && t.vignette ? (S(), c("div", pc)) : s("", !0),
			u.value && t.grain ? (S(), c("div", {
				key: 2,
				class: "phlix-backdrop__grain",
				style: v(m.value),
				"aria-hidden": "true"
			}, null, 4)) : s("", !0)
		], 64));
	}
}), [["__scopeId", "data-v-c521cafc"]]), hc = [
	"tabindex",
	"aria-label",
	"aria-valuemin",
	"aria-valuemax",
	"aria-valuenow",
	"aria-valuetext",
	"aria-disabled"
], gc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Slider",
	props: {
		modelValue: {},
		min: { default: 0 },
		max: { default: 100 },
		step: { default: 1 },
		disabled: {
			type: Boolean,
			default: !1
		},
		label: {},
		formatValue: {}
	},
	emits: ["update:modelValue", "change"],
	setup(e, { emit: t }) {
		let n = e, r = t, a = w(null), o = w(!1), s = i(() => {
			let e = n.max - n.min || 1;
			return Math.min(100, Math.max(0, (n.modelValue - n.min) / e * 100));
		}), u = i(() => n.formatValue ? n.formatValue(n.modelValue) : String(n.modelValue));
		function d(e) {
			let t = Math.min(n.max, Math.max(n.min, e)), r = Math.round((t - n.min) / n.step), i = n.min + r * n.step;
			return Math.round(i * 1e6) / 1e6;
		}
		function f(e, t = !1) {
			let i = d(e);
			i !== n.modelValue && (r("update:modelValue", i), t && r("change", i));
		}
		function p(e) {
			let t = a.value;
			if (!t) return n.modelValue;
			let r = t.getBoundingClientRect(), i = r.width ? (e - r.left) / r.width : 0;
			return n.min + i * (n.max - n.min);
		}
		function m(e) {
			n.disabled || (e.currentTarget.setPointerCapture?.(e.pointerId), o.value = !0, f(p(e.clientX)));
		}
		function h(e) {
			o.value && f(p(e.clientX));
		}
		function g(e) {
			o.value && (o.value = !1, e.currentTarget.releasePointerCapture?.(e.pointerId), r("change", n.modelValue));
		}
		function y(e) {
			if (n.disabled) return;
			let t = (n.max - n.min) / 10, r = !0;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowUp":
					f(n.modelValue + n.step, !0);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					f(n.modelValue - n.step, !0);
					break;
				case "PageUp":
					f(n.modelValue + t, !0);
					break;
				case "PageDown":
					f(n.modelValue - t, !0);
					break;
				case "Home":
					f(n.min, !0);
					break;
				case "End":
					f(n.max, !0);
					break;
				default: r = !1;
			}
			r && e.preventDefault();
		}
		return (t, n) => (S(), c("div", {
			class: _(["phlix-slider", { "is-disabled": e.disabled }]),
			role: "slider",
			tabindex: e.disabled ? -1 : 0,
			"aria-label": e.label,
			"aria-valuemin": e.min,
			"aria-valuemax": e.max,
			"aria-valuenow": e.modelValue,
			"aria-valuetext": u.value,
			"aria-disabled": e.disabled || void 0,
			"aria-orientation": "horizontal",
			onKeydown: y
		}, [l("div", {
			ref_key: "trackEl",
			ref: a,
			class: "phlix-slider__track",
			onPointerdown: m,
			onPointermove: h,
			onPointerup: g
		}, [l("div", {
			class: "phlix-slider__fill",
			style: v({ width: s.value + "%" })
		}, null, 4), l("div", {
			class: "phlix-slider__thumb",
			style: v({ left: s.value + "%" })
		}, null, 4)], 544)], 42, hc));
	}
}), [["__scopeId", "data-v-9ca92975"]]), _c = [
	"aria-checked",
	"aria-label",
	"aria-labelledby",
	"disabled"
], vc = ["id"], yc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Switch",
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue"],
	setup(e, { emit: t }) {
		let n = e, r = t, i = j();
		function a() {
			n.disabled || r("update:modelValue", !n.modelValue);
		}
		return (t, n) => (S(), c("span", { class: _(["phlix-switch", { "is-disabled": e.disabled }]) }, [l("button", {
			type: "button",
			role: "switch",
			class: _(["phlix-switch__control", { "is-on": e.modelValue }]),
			"aria-checked": e.modelValue,
			"aria-label": e.label ? void 0 : "Toggle",
			"aria-labelledby": e.label ? A(i) : void 0,
			disabled: e.disabled,
			onClick: a
		}, [...n[0] ||= [l("span", { class: "phlix-switch__thumb" }, null, -1)]], 10, _c), e.label ? (S(), c("label", {
			key: 0,
			id: A(i),
			class: "phlix-switch__label",
			onClick: a
		}, k(e.label), 9, vc)) : s("", !0)], 2));
	}
}), [["__scopeId", "data-v-4631a106"]]), bc = ["aria-labelledby"], xc = {
	key: 0,
	class: "phlix-modal__header"
}, Sc = ["id"], Cc = { class: "phlix-modal__body" }, wc = {
	key: 1,
	class: "phlix-modal__footer"
}, Tc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Modal",
	props: {
		modelValue: { type: Boolean },
		title: {},
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		},
		size: { default: "md" }
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: r }) {
		let i = e, a = r, u = w(i.modelValue);
		F(() => i.modelValue, (e) => u.value = e);
		let d = w(null), p = j();
		function m() {
			a("update:modelValue", !1), a("close");
		}
		function h() {
			i.dismissible && m();
		}
		return Er(d, u, { onEscape: () => i.dismissible ? (m(), !0) : !1 }), (r, i) => (S(), o(t, { to: "body" }, [f(n, { name: "phlix-modal" }, {
			default: L(() => [e.modelValue ? (S(), c("div", {
				key: 0,
				class: "phlix-modal",
				onPointerdown: B(h, ["self"])
			}, [l("div", {
				ref_key: "panelEl",
				ref: d,
				class: _(["phlix-modal__panel", `phlix-modal__panel--${e.size}`]),
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? A(p) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (S(), c("header", xc, [e.title ? (S(), c("h2", {
					key: 0,
					id: A(p),
					class: "phlix-modal__title"
				}, k(e.title), 9, Sc)) : s("", !0), e.hideClose ? s("", !0) : (S(), o(_r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					class: "phlix-modal__close",
					onClick: m
				}))])) : s("", !0),
				l("div", Cc, [E(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (S(), c("footer", wc, [E(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 10, bc)], 32)) : s("", !0)]),
			_: 3
		})]));
	}
}), [["__scopeId", "data-v-ad69ec41"]]), Ec = ["aria-labelledby"], Dc = {
	key: 0,
	class: "phlix-sheet__header"
}, Oc = ["id"], kc = { class: "phlix-sheet__body" }, Ac = {
	key: 1,
	class: "phlix-sheet__footer"
}, jc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Sheet",
	props: {
		modelValue: { type: Boolean },
		title: {},
		side: { default: "right" },
		dismissible: {
			type: Boolean,
			default: !0
		},
		hideClose: {
			type: Boolean,
			default: !1
		}
	},
	emits: ["update:modelValue", "close"],
	setup(e, { emit: r }) {
		let i = e, a = r, u = w(i.modelValue);
		F(() => i.modelValue, (e) => u.value = e);
		let d = w(null), p = j();
		function m() {
			a("update:modelValue", !1), a("close");
		}
		function h() {
			i.dismissible && m();
		}
		return Er(d, u, { onEscape: () => i.dismissible ? (m(), !0) : !1 }), (r, i) => (S(), o(t, { to: "body" }, [f(n, { name: `phlix-sheet-${e.side}` }, {
			default: L(() => [e.modelValue ? (S(), c("div", {
				key: 0,
				class: _(["phlix-sheet", `phlix-sheet--${e.side}`]),
				onPointerdown: B(h, ["self"])
			}, [l("aside", {
				ref_key: "panelEl",
				ref: d,
				class: "phlix-sheet__panel",
				role: "dialog",
				"aria-modal": "true",
				"aria-labelledby": e.title ? A(p) : void 0,
				tabindex: "-1"
			}, [
				e.title || !e.hideClose ? (S(), c("header", Dc, [e.title ? (S(), c("h2", {
					key: 0,
					id: A(p),
					class: "phlix-sheet__title"
				}, k(e.title), 9, Oc)) : s("", !0), e.hideClose ? s("", !0) : (S(), o(_r, {
					key: 1,
					name: "x",
					label: "Close",
					size: "sm",
					onClick: m
				}))])) : s("", !0),
				l("div", kc, [E(r.$slots, "default", {}, void 0, !0)]),
				r.$slots.footer ? (S(), c("footer", Ac, [E(r.$slots, "footer", {}, void 0, !0)])) : s("", !0)
			], 8, Ec)], 34)) : s("", !0)]),
			_: 3
		}, 8, ["name"])]));
	}
}), [["__scopeId", "data-v-6960f9fb"]]), Mc = ["id"], Nc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Tooltip",
	props: {
		text: {},
		placement: { default: "top" },
		delay: { default: 300 },
		disabled: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, r = j(), i = w(!1), a = w(null), o;
		function l() {
			return a.value?.firstElementChild ?? null;
		}
		function u() {
			t.disabled || (clearTimeout(o), o = setTimeout(() => {
				i.value = !0, l()?.setAttribute("aria-describedby", r);
			}, t.delay));
		}
		function p() {
			clearTimeout(o), i.value = !1, l()?.removeAttribute("aria-describedby");
		}
		return y(() => clearTimeout(o)), (t, o) => (S(), c("span", {
			ref_key: "wrapEl",
			ref: a,
			class: "phlix-tooltip-wrap",
			onMouseenter: u,
			onMouseleave: p,
			onFocusin: u,
			onFocusout: p,
			onKeydown: z(p, ["esc"])
		}, [E(t.$slots, "default", {}, void 0, !0), f(n, { name: "phlix-tooltip" }, {
			default: L(() => [i.value && (e.text || t.$slots.content) ? (S(), c("span", {
				key: 0,
				id: A(r),
				role: "tooltip",
				class: _(["phlix-tooltip", `phlix-tooltip--${e.placement}`])
			}, [E(t.$slots, "content", {}, () => [d(k(e.text), 1)], !0)], 10, Mc)) : s("", !0)]),
			_: 3
		})], 544));
	}
}), [["__scopeId", "data-v-bdb87991"]]), Pc = ["role"], Fc = { class: "phlix-toast__content" }, Ic = {
	key: 0,
	class: "phlix-toast__title"
}, Lc = { class: "phlix-toast__message" }, Rc = ["onClick"], zc = 0, Bc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "ToastHost",
	props: { position: { default: "bottom" } },
	setup(n) {
		let i = Di(), a = {
			neutral: "info",
			success: "success",
			warning: "alert",
			error: "error",
			info: "info"
		}, u = (e) => e.icon ?? a[e.tone];
		return b(() => {
			zc++;
		}), y(() => {
			zc--;
		}), (a, d) => (S(), o(t, { to: "body" }, [l("div", {
			class: _(["phlix-toasts", `phlix-toasts--${n.position}`]),
			role: "region",
			"aria-label": "Notifications"
		}, [f(r, { name: "phlix-toast" }, {
			default: L(() => [(S(!0), c(e, null, T(A(i).toasts, (e) => (S(), c("div", {
				key: e.id,
				class: _(["phlix-toast", `phlix-toast--${e.tone}`]),
				role: e.tone === "error" ? "alert" : "status"
			}, [
				f(J, {
					name: u(e),
					class: "phlix-toast__icon"
				}, null, 8, ["name"]),
				l("div", Fc, [e.title ? (S(), c("p", Ic, k(e.title), 1)) : s("", !0), l("p", Lc, k(e.message), 1)]),
				e.action ? (S(), c("button", {
					key: 0,
					type: "button",
					class: "phlix-toast__action",
					onClick: (t) => {
						e.action.onClick(), A(i).dismiss(e.id);
					}
				}, k(e.action.label), 9, Rc)) : s("", !0),
				f(_r, {
					name: "x",
					label: "Dismiss",
					size: "sm",
					class: "phlix-toast__close",
					onClick: (t) => A(i).dismiss(e.id)
				}, null, 8, ["onClick"])
			], 10, Pc))), 128))]),
			_: 1
		})], 2)]));
	}
}), [["__scopeId", "data-v-df4e2232"]]), Vc = ["aria-label"], Hc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Spinner",
	props: {
		size: {},
		label: { default: "Loading" }
	},
	setup(e) {
		let t = e, n = i(() => t.size === void 0 ? void 0 : typeof t.size == "number" ? `${t.size}px` : t.size);
		return (t, r) => (S(), c("span", {
			class: "phlix-spinner",
			role: "status",
			"aria-label": e.label,
			style: v(n.value ? { fontSize: n.value } : void 0)
		}, [f(J, {
			name: "spinner",
			class: "phlix-spinner__icon"
		})], 12, Vc));
	}
}), [["__scopeId", "data-v-2e0507dd"]]), Uc = { class: "phlix-tabs" }, Wc = ["aria-label"], Gc = [
	"id",
	"aria-selected",
	"aria-controls",
	"tabindex",
	"disabled",
	"onClick"
], Kc = ["id", "aria-labelledby"], qc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Tabs",
	props: {
		modelValue: {},
		tabs: {},
		label: {}
	},
	emits: ["update:modelValue"],
	setup(t, { emit: n }) {
		let r = t, a = n, u = j(), f = w(null), p = i(() => r.tabs.findIndex((e) => e.value === r.modelValue)), m = (e) => `${u}-tab-${e}`, h = (e) => `${u}-panel-${e}`, g = i(() => r.tabs.map((e) => ({
			value: e.value,
			label: e.label,
			disabled: e.disabled
		})));
		function v(e) {
			let t = r.tabs.find((t) => t.value === e);
			!t || t.disabled || e !== r.modelValue && a("update:modelValue", e);
		}
		function y(e) {
			f.value?.querySelectorAll("[role=\"tab\"]")[e]?.focus();
		}
		function b(e) {
			let t = -1;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowDown":
					t = $(g.value, p.value, 1);
					break;
				case "ArrowLeft":
				case "ArrowUp":
					t = $(g.value, p.value, -1);
					break;
				case "Home":
					t = $(g.value, -1, 1);
					break;
				case "End":
					t = $(g.value, 0, -1);
					break;
				default: return;
			}
			t >= 0 && (e.preventDefault(), v(r.tabs[t].value), y(t));
		}
		return (n, r) => (S(), c("div", Uc, [l("div", {
			ref_key: "listEl",
			ref: f,
			class: "phlix-tabs__list",
			role: "tablist",
			"aria-label": t.label,
			onKeydown: b
		}, [(S(!0), c(e, null, T(t.tabs, (e) => (S(), c("button", {
			id: m(e.value),
			key: e.value,
			type: "button",
			role: "tab",
			class: _(["phlix-tabs__tab", { "is-active": e.value === t.modelValue }]),
			"aria-selected": e.value === t.modelValue,
			"aria-controls": h(e.value),
			tabindex: e.value === t.modelValue ? 0 : -1,
			disabled: e.disabled,
			onClick: (t) => v(e.value)
		}, [e.icon ? (S(), o(J, {
			key: 0,
			name: e.icon,
			class: "phlix-tabs__icon"
		}, null, 8, ["name"])) : s("", !0), d(" " + k(e.label), 1)], 10, Gc))), 128))], 40, Wc), t.modelValue ? (S(), c("div", {
			key: 0,
			id: h(t.modelValue),
			class: "phlix-tabs__panel",
			role: "tabpanel",
			"aria-labelledby": m(t.modelValue),
			tabindex: "0"
		}, [E(n.$slots, t.modelValue, {}, () => [E(n.$slots, "default", {}, void 0, !0)], !0)], 8, Kc)) : s("", !0)]));
	}
}), [["__scopeId", "data-v-95493097"]]), Jc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "Reveal",
	props: {
		tag: { default: "div" },
		delay: { default: 0 },
		y: { default: 12 },
		whenVisible: {
			type: Boolean,
			default: !1
		}
	},
	setup(e) {
		let t = e, n = w(null), r = w(!1), i = w(!1), a = null, s = typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		return b(() => {
			if (s) {
				r.value = !0;
				return;
			}
			t.whenVisible && typeof IntersectionObserver < "u" ? (a = new IntersectionObserver((e) => {
				e.some((e) => e.isIntersecting) && (r.value = !0, a?.disconnect(), a = null);
			}, { threshold: .1 }), n.value && a.observe(n.value)) : requestAnimationFrame(() => requestAnimationFrame(() => r.value = !0));
		}), y(() => {
			a?.disconnect(), a = null;
		}), (t, a) => (S(), o(O(e.tag), {
			ref_key: "el",
			ref: n,
			class: _(["phlix-reveal", {
				"is-revealed": r.value,
				"is-settled": i.value
			}]),
			style: v({
				"--reveal-delay": `${e.delay}ms`,
				"--reveal-y": `${e.y}px`
			}),
			onTransitionend: a[0] ||= (e) => i.value = !0
		}, {
			default: L(() => [E(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 40, ["class", "style"]));
	}
}), [["__scopeId", "data-v-162397f9"]]), Yc = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "PageTransition",
	props: { mode: { default: "fade" } },
	setup(e) {
		return (t, r) => (S(), o(n, {
			name: `phlix-page-${e.mode}`,
			mode: "out-in"
		}, {
			default: L(() => [E(t.$slots, "default", {}, void 0, !0)]),
			_: 3
		}, 8, ["name"]));
	}
}), [["__scopeId", "data-v-dafe74d0"]]), Xc = { class: "library-scan-page" }, Zc = {
	key: 0,
	class: "loading"
}, Qc = {
	key: 1,
	class: "error"
}, $c = {
	key: 2,
	class: "libraries-list"
}, el = { class: "library-info" }, tl = { class: "library-name" }, nl = { class: "library-type" }, rl = { class: "library-paths" }, il = { class: "library-meta" }, al = { key: 0 }, ol = {
	key: 0,
	class: "scan-status"
}, sl = { class: "library-actions" }, cl = ["onClick", "disabled"], ll = ["onClick", "disabled"], ul = {
	key: 0,
	class: "empty-state"
}, dl = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "LibraryScanPage",
	setup(t) {
		let n = w([]), r = w({}), i = w(!0), a = w(null);
		async function o() {
			try {
				n.value = (await Z.get("/api/v1/libraries")).libraries || [];
				for (let e of n.value) u(e.id);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to load libraries";
			} finally {
				i.value = !1;
			}
		}
		async function u(e) {
			try {
				let t = await Z.get(`/api/v1/libraries/${e}/scan-status`);
				t.job && (r.value[e] = t.job);
			} catch {}
		}
		async function d(e) {
			try {
				await Z.post(`/api/v1/libraries/${e}/scan`), await u(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger scan";
			}
		}
		async function f(e) {
			try {
				await Z.post(`/api/v1/libraries/${e}/rescan`), await u(e);
			} catch (e) {
				a.value = e instanceof Error ? e.message : "Failed to trigger rescan";
			}
		}
		function p(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		function m(e) {
			if (!e) return "";
			switch (e.status) {
				case "queued": return "⏳ Queued";
				case "running": return "🔄 Running";
				case "completed": return "✅ Completed";
				case "failed": return `❌ Failed: ${e.error || "Unknown error"}`;
				default: return e.status;
			}
		}
		return b(() => {
			o();
		}), (t, o) => (S(), c("div", Xc, [o[0] ||= l("div", { class: "scan-header" }, [l("h1", { class: "scan-title" }, "Library Scanner"), l("p", { class: "scan-subtitle" }, "Scan your media libraries to discover new content")], -1), i.value ? (S(), c("div", Zc, "Loading libraries...")) : a.value ? (S(), c("div", Qc, k(a.value), 1)) : (S(), c("div", $c, [(S(!0), c(e, null, T(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "library-card"
		}, [l("div", el, [
			l("h3", tl, k(e.name), 1),
			l("span", nl, k(e.type), 1),
			l("p", rl, k(e.paths.join(", ")), 1),
			l("div", il, [e.item_count === void 0 ? s("", !0) : (S(), c("span", al, k(e.item_count) + " items", 1)), l("span", null, "Last scan: " + k(p(e.last_scan_at)), 1)]),
			r.value[e.id] ? (S(), c("div", ol, k(m(r.value[e.id])), 1)) : s("", !0)
		]), l("div", sl, [l("button", {
			class: "btn btn-scan",
			onClick: (t) => d(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Scan ", 8, cl), l("button", {
			class: "btn btn-rescan",
			onClick: (t) => f(e.id),
			disabled: r.value[e.id]?.status === "running" || r.value[e.id]?.status === "queued"
		}, " Rescan ", 8, ll)])]))), 128)), n.value.length === 0 ? (S(), c("div", ul, " No libraries configured. Add a library to get started. ")) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-62b3805e"]]), fl = { class: "my-servers-page" }, pl = {
	key: 0,
	class: "loading"
}, ml = {
	key: 1,
	class: "error"
}, hl = {
	key: 2,
	class: "servers-list"
}, gl = { class: "server-info" }, _l = { class: "server-name" }, vl = { class: "server-url" }, yl = { class: "server-meta" }, bl = { key: 0 }, xl = {
	key: 0,
	class: "empty-state"
}, Sl = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "MyServersPage",
	setup(t) {
		let n = w([]), r = w(!0), i = w(null);
		async function a() {
			try {
				n.value = (await Z.get("/api/v1/servers")).servers || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load servers";
			} finally {
				r.value = !1;
			}
		}
		function o(e) {
			switch (e) {
				case "online": return "#22c55e";
				case "offline": return "#ef4444";
				case "connecting": return "#eab308";
				default: return "#6b7280";
			}
		}
		function u(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return b(() => {
			a();
		}), (t, a) => (S(), c("div", fl, [a[2] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "My Servers"), l("p", { class: "page-subtitle" }, "Manage your connected media servers")], -1), r.value ? (S(), c("div", pl, "Loading servers...")) : i.value ? (S(), c("div", ml, k(i.value), 1)) : (S(), c("div", hl, [(S(!0), c(e, null, T(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "server-card"
		}, [
			l("div", {
				class: "server-status",
				style: v({ backgroundColor: o(e.status) })
			}, null, 4),
			l("div", gl, [
				l("h3", _l, k(e.name), 1),
				l("p", vl, k(e.url), 1),
				l("div", yl, [
					l("span", null, k(e.owner), 1),
					e.library_count === void 0 ? s("", !0) : (S(), c("span", bl, k(e.library_count) + " libraries", 1)),
					l("span", null, "Last seen: " + k(u(e.last_seen)), 1)
				])
			]),
			a[0] ||= l("div", { class: "server-actions" }, [l("button", { class: "btn btn-primary" }, "Manage")], -1)
		]))), 128)), n.value.length === 0 ? (S(), c("div", xl, [...a[1] ||= [l("p", null, "No servers connected yet.", -1), l("button", { class: "btn btn-primary" }, "Add Server", -1)]])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-b9237da4"]]), Cl = { class: "federation-page" }, wl = {
	key: 0,
	class: "loading"
}, Tl = {
	key: 1,
	class: "error"
}, El = {
	key: 2,
	class: "federation-content"
}, Dl = { class: "peers-section" }, Ol = { class: "peers-list" }, kl = { class: "peer-info" }, Al = { class: "peer-name" }, jl = { class: "peer-url" }, Ml = { class: "peer-meta" }, Nl = { key: 0 }, Pl = { class: "peer-actions" }, Fl = ["onClick"], Il = {
	key: 1,
	class: "status-badge"
}, Ll = {
	key: 0,
	class: "empty-state"
}, Rl = { class: "add-peer-section" }, zl = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "FederationPage",
	setup(t) {
		let n = w([]), r = w(!0), i = w(null);
		async function a() {
			try {
				n.value = (await Z.get("/api/v1/federation/peers")).peers || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load federation peers";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await Z.post("/api/v1/federation/connect", { url: e }), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to connect to peer";
			}
		}
		async function u(e) {
			try {
				await Z.post(`/api/v1/federation/peers/${e}/disconnect`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to disconnect peer";
			}
		}
		function d(e) {
			switch (e) {
				case "connected": return "#22c55e";
				case "disconnected": return "#ef4444";
				case "pending": return "#eab308";
				default: return "#6b7280";
			}
		}
		function f(e) {
			return e ? new Date(e).toLocaleString() : "Never";
		}
		return b(() => {
			a();
		}), (t, a) => (S(), c("div", Cl, [a[5] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Federation"), l("p", { class: "page-subtitle" }, "Connect with other Phlix servers to share libraries")], -1), r.value ? (S(), c("div", wl, "Loading federation peers...")) : i.value ? (S(), c("div", Tl, k(i.value), 1)) : (S(), c("div", El, [l("div", Dl, [a[2] ||= l("h2", { class: "section-title" }, "Connected Peers", -1), l("div", Ol, [(S(!0), c(e, null, T(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "peer-card"
		}, [
			l("div", {
				class: "peer-status",
				style: v({ backgroundColor: d(e.status) })
			}, null, 4),
			l("div", kl, [
				l("h3", Al, k(e.name), 1),
				l("p", jl, k(e.url), 1),
				l("div", Ml, [e.shared_libraries_count === void 0 ? s("", !0) : (S(), c("span", Nl, k(e.shared_libraries_count) + " shared libraries", 1)), l("span", null, "Last sync: " + k(f(e.last_sync)), 1)])
			]),
			l("div", Pl, [e.status === "connected" ? (S(), c("button", {
				key: 0,
				class: "btn btn-secondary",
				onClick: (t) => u(e.id)
			}, " Disconnect ", 8, Fl)) : e.status === "pending" ? (S(), c("span", Il, "Pending")) : s("", !0)])
		]))), 128)), n.value.length === 0 ? (S(), c("div", Ll, [...a[1] ||= [l("p", null, "No federation peers connected.", -1)]])) : s("", !0)])]), l("div", Rl, [a[4] ||= l("h2", { class: "section-title" }, "Add Peer", -1), l("form", {
			class: "add-peer-form",
			onSubmit: a[0] ||= B((e) => o(""), ["prevent"])
		}, [...a[3] ||= [l("input", {
			type: "url",
			placeholder: "https://other-server.example.com",
			class: "peer-input"
		}, null, -1), l("button", {
			type: "submit",
			class: "btn btn-primary"
		}, "Connect", -1)]], 32)])]))]));
	}
}), [["__scopeId", "data-v-91ba2781"]]), Bl = { class: "manage-shares-page" }, Vl = {
	key: 0,
	class: "loading"
}, Hl = {
	key: 1,
	class: "error"
}, Ul = {
	key: 2,
	class: "shares-list"
}, Wl = { class: "share-info" }, Gl = { class: "share-library" }, Kl = { class: "share-meta" }, ql = {
	key: 0,
	class: "expired-badge"
}, Jl = { class: "share-dates" }, Yl = { key: 0 }, Xl = { class: "share-actions" }, Zl = ["onClick"], Ql = {
	key: 0,
	class: "empty-state"
}, $l = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "ManageSharesPage",
	setup(t) {
		let n = w([]), r = w(!0), i = w(null);
		async function a() {
			try {
				n.value = (await Z.get("/api/v1/shares")).shares || [];
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load shares";
			} finally {
				r.value = !1;
			}
		}
		async function o(e) {
			try {
				await Z.delete(`/api/v1/shares/${e}`), await a();
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to revoke share";
			}
		}
		function u(e) {
			return new Date(e).toLocaleString();
		}
		function f(e) {
			return e ? new Date(e) < /* @__PURE__ */ new Date() : !1;
		}
		return b(() => {
			a();
		}), (t, a) => (S(), c("div", Bl, [a[1] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Manage Shares"), l("p", { class: "page-subtitle" }, "View and manage your shared libraries")], -1), r.value ? (S(), c("div", Vl, "Loading shares...")) : i.value ? (S(), c("div", Hl, k(i.value), 1)) : (S(), c("div", Ul, [(S(!0), c(e, null, T(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "share-card"
		}, [l("div", Wl, [
			l("h3", Gl, k(e.library_name), 1),
			l("div", Kl, [
				l("span", null, "Shared with: " + k(e.shared_with), 1),
				l("span", { class: _(["permission-badge", e.permissions]) }, k(e.permissions), 3),
				e.expires_at && f(e.expires_at) ? (S(), c("span", ql, "Expired")) : s("", !0)
			]),
			l("p", Jl, [d(" Created: " + k(u(e.created_at)) + " ", 1), e.expires_at ? (S(), c("span", Yl, " | Expires: " + k(u(e.expires_at)), 1)) : s("", !0)])
		]), l("div", Xl, [l("button", {
			class: "btn btn-danger",
			onClick: (t) => o(e.id)
		}, "Revoke", 8, Zl)])]))), 128)), n.value.length === 0 ? (S(), c("div", Ql, [...a[0] ||= [l("p", null, "No library shares found.", -1)]])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-bd8771ac"]]), eu = { class: "audit-logs-page" }, tu = {
	key: 0,
	class: "loading"
}, nu = {
	key: 1,
	class: "error"
}, ru = {
	key: 2,
	class: "logs-container"
}, iu = { class: "logs-list" }, au = { class: "log-content" }, ou = { class: "log-header" }, su = { class: "log-action" }, cu = { class: "log-actor" }, lu = { class: "log-time" }, uu = {
	key: 0,
	class: "log-target"
}, du = {
	key: 1,
	class: "log-details"
}, fu = {
	key: 2,
	class: "log-ip"
}, pu = {
	key: 0,
	class: "empty-state"
}, mu = {
	key: 0,
	class: "pagination"
}, hu = ["disabled"], gu = { class: "page-info" }, _u = ["disabled"], vu = /*#__PURE__*/ q(/* @__PURE__ */ p({
	__name: "AuditLogsPage",
	setup(t) {
		let n = w([]), r = w(!0), i = w(null), a = w(1), o = w(1);
		async function u(e = 1) {
			try {
				r.value = !0;
				let t = await Z.get("/api/v1/audit-logs", { page: String(e) });
				n.value = t.logs || [], a.value = t.page || 1, o.value = t.total_pages || 1;
			} catch (e) {
				i.value = e instanceof Error ? e.message : "Failed to load audit logs";
			} finally {
				r.value = !1;
			}
		}
		function d(e) {
			return new Date(e).toLocaleString();
		}
		function f(e) {
			return e.includes("create") || e.includes("add") ? "#22c55e" : e.includes("delete") || e.includes("remove") ? "#ef4444" : e.includes("update") || e.includes("edit") ? "#3b82f6" : e.includes("login") || e.includes("auth") ? "#8b5cf6" : "#6b7280";
		}
		function p(e) {
			return e.includes("create") || e.includes("add") ? "+" : e.includes("delete") || e.includes("remove") ? "-" : e.includes("update") || e.includes("edit") ? "~" : e.includes("login") || e.includes("auth") ? "@" : "#";
		}
		return b(() => {
			u();
		}), (t, m) => (S(), c("div", eu, [m[3] ||= l("div", { class: "page-header" }, [l("h1", { class: "page-title" }, "Audit Logs"), l("p", { class: "page-subtitle" }, "View system activity and user actions")], -1), r.value ? (S(), c("div", tu, "Loading audit logs...")) : i.value ? (S(), c("div", nu, k(i.value), 1)) : (S(), c("div", ru, [l("div", iu, [(S(!0), c(e, null, T(n.value, (e) => (S(), c("div", {
			key: e.id,
			class: "log-entry"
		}, [l("div", {
			class: "log-icon",
			style: v({ backgroundColor: f(e.action) })
		}, k(p(e.action)), 5), l("div", au, [
			l("div", ou, [
				l("span", su, k(e.action), 1),
				l("span", cu, k(e.actor), 1),
				l("span", lu, k(d(e.created_at)), 1)
			]),
			e.target ? (S(), c("p", uu, "Target: " + k(e.target), 1)) : s("", !0),
			e.details ? (S(), c("p", du, k(e.details), 1)) : s("", !0),
			e.ip_address ? (S(), c("span", fu, "IP: " + k(e.ip_address), 1)) : s("", !0)
		])]))), 128)), n.value.length === 0 ? (S(), c("div", pu, [...m[2] ||= [l("p", null, "No audit logs found.", -1)]])) : s("", !0)]), o.value > 1 ? (S(), c("div", mu, [
			l("button", {
				class: "btn btn-secondary",
				disabled: a.value <= 1,
				onClick: m[0] ||= (e) => u(a.value - 1)
			}, " Previous ", 8, hu),
			l("span", gu, "Page " + k(a.value) + " of " + k(o.value), 1),
			l("button", {
				class: "btn btn-secondary",
				disabled: a.value >= o.value,
				onClick: m[1] ||= (e) => u(a.value + 1)
			}, " Next ", 8, _u)
		])) : s("", !0)]))]));
	}
}), [["__scopeId", "data-v-05910fd9"]]);
//#endregion
//#region src/composables/useMediaUrlSync.ts
function yu(e, t) {
	let n = bi(), r = !1;
	n.applyQuery(e.currentRoute.value.query), n.fetchMedia(t);
	let i = F(() => JSON.stringify(n.toQuery()), () => {
		r || (r = !0, e.replace({ query: n.toQuery() }).finally(() => {
			r = !1;
		}), n.scheduleFetch(t));
	}), a = F(() => e.currentRoute.value.query, (e) => {
		r || JSON.stringify(e) !== JSON.stringify(n.toQuery()) && (r = !0, n.applyQuery(e), r = !1, n.fetchMedia(t));
	});
	return () => {
		i(), a(), n.cancelScheduled();
	};
}
//#endregion
export { X as ApiClient, hi as ApiError, mc as AppBackdrop, de as AppLayout, vu as AuditLogsPage, Ka as Badge, So as BrowsePage, Eo as Button, Aa as Chip, za as Combobox, Jr as CommandPalette, Nr as DEFAULT_PREFERENCES, fa as EmptyState, zl as FederationPage, go as FilterBar, J as Icon, _r as IconButton, br as Kbd, dl as LibraryScanPage, Ss as LocalStorageTokenStore, js as LoginForm, Ps as LoginPage, $l as ManageSharesPage, Zi as MediaCard, Jo as MediaDetail, $o as MediaDetailPage, oa as MediaGrid, Ea as MediaHomeRow, Ca as MediaRow, Tc as Modal, Sl as MyServersPage, Yc as PageTransition, di as PhlixApp, ms as Player, vs as PlayerPage, Si as RESUME_MAX_RATIO, xi as RESUME_MIN_SECONDS, Jc as Reveal, Wa as Select, sc as SettingsForm, lc as SettingsPage, jc as Sheet, Gs as SignupForm, Js as SignupPage, Q as Skeleton, gc as Slider, Hc as Spinner, yc as Switch, qc as Tabs, Bc as ToastHost, Nc as Tooltip, ai as applyStoredThemeEarly, yu as bindMediaStoreToRouter, wa as buildMediaQuery, Ta as buildMediaUrl, fc as createPhlixApp, ni as deriveAccentVars, kr as fuzzyScore, Lr as hasStoredPreferences, Ar as matchCommand, Ir as readStoredPreferences, Cs as useAuthStore, Mr as useCommandStore, Er as useFocusTrap, bi as useMediaStore, Ei as usePlayerStore, Y as usePreferencesStore, oi as useTheme, Di as useToastStore };

//# sourceMappingURL=phlix-ui.js.map