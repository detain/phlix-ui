import { computed as e, createBlock as t, createElementBlock as n, createElementVNode as r, createStaticVNode as i, defineComponent as a, markRaw as o, normalizeStyle as s, openBlock as c, resolveDynamicComponent as ee } from "vue";
//#region ~icons/lucide/play
var te = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ne(e, t) {
	return c(), n("svg", te, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var l = o({
	name: "lucide-play",
	render: ne
}), u = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function d(e, t) {
	return c(), n("svg", u, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "5",
		height: "18",
		x: "14",
		y: "3",
		rx: "1"
	}), r("rect", {
		width: "5",
		height: "18",
		x: "5",
		y: "3",
		rx: "1"
	})], -1)]]);
}
var f = o({
	name: "lucide-pause",
	render: d
}), p = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function m(e, t) {
	return c(), n("svg", p, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var h = o({
	name: "lucide-skip-back",
	render: m
}), g = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _(e, t) {
	return c(), n("svg", g, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var v = o({
	name: "lucide-skip-forward",
	render: _
}), y = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function b(e, t) {
	return c(), n("svg", y, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), r("path", { d: "M3 3v5h5" })], -1)]]);
}
var x = o({
	name: "lucide-rotate-ccw",
	render: b
}), S = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function C(e, t) {
	return c(), n("svg", S, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), r("path", { d: "M21 3v5h-5" })], -1)]]);
}
var w = o({
	name: "lucide-rotate-cw",
	render: C
}), T = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function E(e, t) {
	return c(), n("svg", T, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var D = o({
	name: "lucide-volume-2",
	render: E
}), O = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function k(e, t) {
	return c(), n("svg", O, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var A = o({
	name: "lucide-volume-1",
	render: k
}), j = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function M(e, t) {
	return c(), n("svg", j, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var N = o({
	name: "lucide-volume-x",
	render: M
}), P = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function F(e, t) {
	return c(), n("svg", P, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), r("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var I = o({
	name: "lucide-shuffle",
	render: F
}), L = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function R(e, t) {
	return c(), n("svg", L, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "m17 2l4 4l-4 4" }),
		r("path", { d: "M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4l4-4" }),
		r("path", { d: "M21 13v1a4 4 0 0 1-4 4H3" })
	], -1)]]);
}
var z = o({
	name: "lucide-repeat",
	render: R
}), B = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function V(e, t) {
	return c(), n("svg", B, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "m17 2l4 4l-4 4" }),
		r("path", { d: "M3 11v-1a4 4 0 0 1 4-4h14M7 22l-4-4l4-4" }),
		r("path", { d: "M21 13v1a4 4 0 0 1-4 4H3m8-8h1v4" })
	], -1)]]);
}
var H = o({
	name: "lucide-repeat-1",
	render: V
}), U = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function W(e, t) {
	return c(), n("svg", U, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M16 5H3m8 7H3m8 7H3m18-3V5" }), r("circle", {
		cx: "18",
		cy: "16",
		r: "3"
	})], -1)]]);
}
var G = o({
	name: "lucide-list-music",
	render: W
}), K = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function q(e, t) {
	return c(), n("svg", K, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "18",
		height: "14",
		x: "3",
		y: "5",
		rx: "2",
		ry: "2"
	}), r("path", { d: "M7 15h4m4 0h2M7 11h2m4 0h4" })], -1)]]);
}
var J = o({
	name: "lucide-captions",
	render: q
}), Y = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function X(e, t) {
	return c(), n("svg", Y, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var Z = o({
	name: "lucide-captions-off",
	render: X
}), re = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ie(e, t) {
	return c(), n("svg", re, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" }), r("rect", {
		width: "10",
		height: "7",
		x: "12",
		y: "13",
		rx: "2"
	})], -1)]]);
}
var ae = o({
	name: "lucide-picture-in-picture-2",
	render: ie
}), oe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function se(e, t) {
	return c(), n("svg", oe, [...t[0] ||= [r("rect", {
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
var ce = o({
	name: "lucide-rectangle-horizontal",
	render: se
}), le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ue(e, t) {
	return c(), n("svg", le, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var de = o({
	name: "lucide-maximize",
	render: ue
}), fe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pe(e, t) {
	return c(), n("svg", fe, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var me = o({
	name: "lucide-minimize",
	render: pe
}), he = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ge(e, t) {
	return c(), n("svg", he, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var _e = o({
	name: "lucide-maximize-2",
	render: ge
}), ve = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ye(e, t) {
	return c(), n("svg", ve, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var be = o({
	name: "lucide-cast",
	render: ye
}), xe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Se(e, t) {
	return c(), n("svg", xe, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" }), r("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var Ce = o({
	name: "lucide-settings",
	render: Se
}), we = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Te(e, t) {
	return c(), n("svg", we, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var Ee = o({
	name: "lucide-gauge",
	render: Te
}), De = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Oe(e, t) {
	return c(), n("svg", De, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "18",
		height: "18",
		x: "3",
		y: "3",
		rx: "2"
	}), r("path", { d: "M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18m0-13.5h4m-4 9h4" })], -1)]]);
}
var ke = o({
	name: "lucide-film",
	render: Oe
}), Ae = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function je(e, t) {
	return c(), n("svg", Ae, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2",
			ry: "2"
		}),
		r("circle", {
			cx: "9",
			cy: "9",
			r: "2"
		}),
		r("path", { d: "m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" })
	], -1)]]);
}
var Me = o({
	name: "lucide-image",
	render: je
}), Ne = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pe(e, t) {
	return c(), n("svg", Ne, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "M9 18V5l12-2v13" }),
		r("circle", {
			cx: "6",
			cy: "18",
			r: "3"
		}),
		r("circle", {
			cx: "18",
			cy: "16",
			r: "3"
		})
	], -1)]]);
}
var Fe = o({
	name: "lucide-music",
	render: Pe
}), Ie = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Le(e, t) {
	return c(), n("svg", Ie, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m17 2l-5 5l-5-5" }), r("rect", {
		width: "20",
		height: "15",
		x: "2",
		y: "7",
		rx: "2"
	})], -1)]]);
}
var Re = o({
	name: "lucide-tv",
	render: Le
}), ze = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Be(e, t) {
	return c(), n("svg", ze, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var Ve = o({
	name: "lucide-book",
	render: Be
}), He = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ue(e, t) {
	return c(), n("svg", He, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var We = o({
	name: "lucide-headphones",
	render: Ue
}), Ge = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ke(e, t) {
	return c(), n("svg", Ge, [...t[0] ||= [i("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var qe = o({
	name: "lucide-disc-3",
	render: Ke
}), Je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ye(e, t) {
	return c(), n("svg", Je, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "m11 7.601l-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" }),
		r("path", { d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2s-2.775-3.369-1.5-4.5" }),
		r("circle", {
			cx: "16",
			cy: "7",
			r: "5"
		})
	], -1)]]);
}
var Xe = o({
	name: "lucide-mic-2",
	render: Ye
}), Ze = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qe(e, t) {
	return c(), n("svg", Ze, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m16 13l5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" }), r("rect", {
		width: "14",
		height: "12",
		x: "2",
		y: "6",
		rx: "2"
	})], -1)]]);
}
var $e = o({
	name: "lucide-video",
	render: Qe
}), et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tt(e, t) {
	return c(), n("svg", et, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m21 21l-4.34-4.34" }), r("circle", {
		cx: "11",
		cy: "11",
		r: "8"
	})], -1)]]);
}
var nt = o({
	name: "lucide-search",
	render: tt
}), rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function it(e, t) {
	return c(), n("svg", rt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var at = o({
	name: "lucide-sliders-horizontal",
	render: it
}), ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function st(e, t) {
	return c(), n("svg", ot, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "M8 2v4m8-4v4" }),
		r("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "4",
			rx: "2"
		}),
		r("path", { d: "M3 10h18" })
	], -1)]]);
}
var ct = o({
	name: "lucide-calendar",
	render: st
}), lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ut(e, t) {
	return c(), n("svg", lt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var dt = o({
	name: "lucide-arrow-up-down",
	render: ut
}), ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pt(e, t) {
	return c(), n("svg", ft, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var mt = o({
	name: "lucide-star",
	render: pt
}), ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gt(e, t) {
	return c(), n("svg", ht, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var _t = o({
	name: "lucide-list",
	render: gt
}), Q = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function vt(e, t) {
	return c(), n("svg", Q, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var yt = o({
	name: "lucide-plus",
	render: vt
}), bt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function xt(e, t) {
	return c(), n("svg", bt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "M12 16v-4m0-4h.01" })], -1)]]);
}
var St = o({
	name: "lucide-info",
	render: xt
}), Ct = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function wt(e, t) {
	return c(), n("svg", Ct, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Tt = o({
	name: "lucide-x",
	render: wt
}), Et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Dt(e, t) {
	return c(), n("svg", Et, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var Ot = o({
	name: "lucide-check",
	render: Dt
}), kt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function At(e, t) {
	return c(), n("svg", kt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "18",
		height: "11",
		x: "3",
		y: "11",
		rx: "2",
		ry: "2"
	}), r("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })], -1)]]);
}
var jt = o({
	name: "lucide-lock",
	render: At
}), Mt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Nt(e, t) {
	return c(), n("svg", Mt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Pt = o({
	name: "lucide-bookmark",
	render: Nt
}), Ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function It(e, t) {
	return c(), n("svg", Ft, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Lt = o({
	name: "lucide-bookmark-plus",
	render: It
}), Rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function zt(e, t) {
	return c(), n("svg", Rt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Bt = o({
	name: "lucide-heart",
	render: zt
}), Vt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ht(e, t) {
	return c(), n("svg", Vt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var Ut = o({
	name: "lucide-thumbs-up",
	render: Ht
}), Wt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Gt(e, t) {
	return c(), n("svg", Wt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var Kt = o({
	name: "lucide-thumbs-down",
	render: Gt
}), qt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jt(e, t) {
	return c(), n("svg", qt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }), r("circle", {
		cx: "12",
		cy: "7",
		r: "4"
	})], -1)]]);
}
var Yt = o({
	name: "lucide-user",
	render: Jt
}), Xt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zt(e, t) {
	return c(), n("svg", Xt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Qt = o({
	name: "lucide-log-out",
	render: Zt
}), $t = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function en(e, t) {
	return c(), n("svg", $t, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var tn = o({
	name: "lucide-menu",
	render: en
}), nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rn(e, t) {
	return c(), n("svg", nn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("circle", {
			cx: "12",
			cy: "12",
			r: "1"
		}),
		r("circle", {
			cx: "19",
			cy: "12",
			r: "1"
		}),
		r("circle", {
			cx: "5",
			cy: "12",
			r: "1"
		})
	], -1)]]);
}
var an = o({
	name: "lucide-more-horizontal",
	render: rn
}), on = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function sn(e, t) {
	return c(), n("svg", on, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M2.062 12.348a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 19.876 0a1 1 0 0 1 0 .696a10.75 10.75 0 0 1-19.876 0" }), r("circle", {
		cx: "12",
		cy: "12",
		r: "3"
	})], -1)]]);
}
var cn = o({
	name: "lucide-eye",
	render: sn
}), ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function un(e, t) {
	return c(), n("svg", ln, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), r("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var dn = o({
	name: "lucide-eye-off",
	render: un
}), fn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pn(e, t) {
	return c(), n("svg", fn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m15.5 7.5l2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4m2-2l-9.6 9.6" }), r("circle", {
		cx: "7.5",
		cy: "15.5",
		r: "5.5"
	})], -1)]]);
}
var mn = o({
	name: "lucide-key",
	render: pn
}), hn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gn(e, t) {
	return c(), n("svg", hn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var _n = o({
	name: "lucide-trash",
	render: gn
}), vn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yn(e, t) {
	return c(), n("svg", vn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var bn = o({
	name: "lucide-arrow-left",
	render: yn
}), xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sn(e, t) {
	return c(), n("svg", xn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Cn = o({
	name: "lucide-arrow-right",
	render: Sn
}), wn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tn(e, t) {
	return c(), n("svg", wn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var En = o({
	name: "lucide-arrow-up",
	render: Tn
}), Dn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function On(e, t) {
	return c(), n("svg", Dn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var kn = o({
	name: "lucide-arrow-down",
	render: On
}), An = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jn(e, t) {
	return c(), n("svg", An, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var Mn = o({
	name: "lucide-chevron-down",
	render: jn
}), Nn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pn(e, t) {
	return c(), n("svg", Nn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var Fn = o({
	name: "lucide-chevron-up",
	render: Pn
}), In = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ln(e, t) {
	return c(), n("svg", In, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Rn = o({
	name: "lucide-chevron-left",
	render: Ln
}), zn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bn(e, t) {
	return c(), n("svg", zn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Vn = o({
	name: "lucide-chevron-right",
	render: Bn
}), Hn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Un(e, t) {
	return c(), n("svg", Hn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var Wn = o({
	name: "lucide-loader-circle",
	render: Un
}), Gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kn(e, t) {
	return c(), n("svg", Gn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "M12 8v4m0 4h.01" })], -1)]]);
}
var $ = o({
	name: "lucide-circle-alert",
	render: Kn
}), qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Jn(e, t) {
	return c(), n("svg", qn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "m9 12l2 2l4-4" })], -1)]]);
}
var Yn = o({
	name: "lucide-circle-check",
	render: Jn
}), Xn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Zn(e, t) {
	return c(), n("svg", Xn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "10"
	}), r("path", { d: "m15 9l-6 6m0-6l6 6" })], -1)]]);
}
var Qn = o({
	name: "lucide-circle-x",
	render: Zn
}), $n = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function er(e, t) {
	return c(), n("svg", $n, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("circle", {
		cx: "12",
		cy: "12",
		r: "4"
	}), r("path", { d: "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })], -1)]]);
}
var tr = o({
	name: "lucide-sun",
	render: er
}), nr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function rr(e, t) {
	return c(), n("svg", nr, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var ir = o({
	name: "lucide-moon",
	render: rr
}), ar = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function or(e, t) {
	return c(), n("svg", ar, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("rect", {
		width: "20",
		height: "14",
		x: "2",
		y: "3",
		rx: "2"
	}), r("path", { d: "M8 21h8m-4-4v4" })], -1)]]);
}
var sr = o({
	name: "lucide-monitor",
	render: or
}), cr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function lr(e, t) {
	return c(), n("svg", cr, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
	}, null, -1)]]);
}
var ur = o({
	name: "lucide-external-link",
	render: lr
}), dr = /* @__PURE__ */ a({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(n) {
		let r = {
			play: l,
			pause: f,
			"skip-back": h,
			"skip-forward": v,
			rewind: x,
			forward: w,
			volume: D,
			"volume-low": A,
			mute: N,
			shuffle: I,
			repeat: z,
			"repeat-1": H,
			"list-music": G,
			captions: J,
			"captions-off": Z,
			pip: ae,
			theater: ce,
			fullscreen: de,
			"fullscreen-exit": me,
			expand: _e,
			cast: be,
			settings: Ce,
			speed: Ee,
			film: ke,
			image: Me,
			music: Fe,
			tv: Re,
			book: Ve,
			headphones: We,
			disc: qe,
			mic: Xe,
			video: $e,
			search: nt,
			filter: at,
			calendar: ct,
			sort: dt,
			star: mt,
			list: _t,
			plus: yt,
			info: St,
			x: Tt,
			check: Ot,
			lock: jt,
			bookmark: Pt,
			"bookmark-plus": Lt,
			heart: Bt,
			"thumbs-up": Ut,
			"thumbs-down": Kt,
			user: Yt,
			"log-out": Qt,
			menu: tn,
			more: an,
			eye: cn,
			"eye-off": dn,
			refresh: w,
			key: mn,
			trash: _n,
			"arrow-left": bn,
			"arrow-right": Cn,
			"arrow-up": En,
			"arrow-down": kn,
			"chevron-down": Mn,
			"chevron-up": Fn,
			"chevron-left": Rn,
			"chevron-right": Vn,
			spinner: Wn,
			alert: $,
			"alert-circle": $,
			success: Yn,
			error: Qn,
			sun: tr,
			moon: ir,
			monitor: sr,
			"external-link": ur
		}, i = n, a = e(() => r[i.name]), o = e(() => i.size === void 0 ? void 0 : typeof i.size == "number" ? `${i.size}px` : i.size);
		return (e, r) => (c(), t(ee(a.value), {
			class: "phlix-icon",
			style: s(o.value ? { fontSize: o.value } : void 0),
			"stroke-width": n.strokeWidth,
			role: n.label ? "img" : void 0,
			"aria-label": n.label,
			"aria-hidden": n.label ? void 0 : "true",
			focusable: "false"
		}, null, 8, [
			"style",
			"stroke-width",
			"role",
			"aria-label",
			"aria-hidden"
		]));
	}
});
//#endregion
export { dr as t };

//# sourceMappingURL=Icon-CGig46Dx.js.map