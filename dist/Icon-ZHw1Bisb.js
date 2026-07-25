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
var re = o({
	name: "lucide-play",
	render: ne
}), l = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function u(e, t) {
	return c(), n("svg", l, [...t[0] ||= [r("g", {
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
var d = o({
	name: "lucide-pause",
	render: u
}), f = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function p(e, t) {
	return c(), n("svg", f, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var m = o({
	name: "lucide-skip-back",
	render: p
}), h = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function g(e, t) {
	return c(), n("svg", h, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var _ = o({
	name: "lucide-skip-forward",
	render: g
}), v = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function y(e, t) {
	return c(), n("svg", v, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), r("path", { d: "M3 3v5h5" })], -1)]]);
}
var b = o({
	name: "lucide-rotate-ccw",
	render: y
}), x = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function S(e, t) {
	return c(), n("svg", x, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), r("path", { d: "M21 3v5h-5" })], -1)]]);
}
var C = o({
	name: "lucide-rotate-cw",
	render: S
}), w = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function T(e, t) {
	return c(), n("svg", w, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var E = o({
	name: "lucide-volume-2",
	render: T
}), D = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function O(e, t) {
	return c(), n("svg", D, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var k = o({
	name: "lucide-volume-1",
	render: O
}), A = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function j(e, t) {
	return c(), n("svg", A, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var M = o({
	name: "lucide-volume-x",
	render: j
}), N = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function P(e, t) {
	return c(), n("svg", N, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "m18 14l4 4l-4 4m0-20l4 4l-4 4" }), r("path", { d: "M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" })], -1)]]);
}
var F = o({
	name: "lucide-shuffle",
	render: P
}), I = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function L(e, t) {
	return c(), n("svg", I, [...t[0] ||= [r("g", {
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
var R = o({
	name: "lucide-repeat",
	render: L
}), z = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function B(e, t) {
	return c(), n("svg", z, [...t[0] ||= [r("g", {
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
var V = o({
	name: "lucide-repeat-1",
	render: B
}), H = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function U(e, t) {
	return c(), n("svg", H, [...t[0] ||= [r("g", {
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
var W = o({
	name: "lucide-list-music",
	render: U
}), G = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function K(e, t) {
	return c(), n("svg", G, [...t[0] ||= [r("g", {
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
var q = o({
	name: "lucide-captions",
	render: K
}), J = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Y(e, t) {
	return c(), n("svg", J, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var X = o({
	name: "lucide-captions-off",
	render: Y
}), ie = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ae(e, t) {
	return c(), n("svg", ie, [...t[0] ||= [r("g", {
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
var oe = o({
	name: "lucide-picture-in-picture-2",
	render: ae
}), se = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ce(e, t) {
	return c(), n("svg", se, [...t[0] ||= [r("rect", {
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
var le = o({
	name: "lucide-rectangle-horizontal",
	render: ce
}), ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function de(e, t) {
	return c(), n("svg", ue, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var fe = o({
	name: "lucide-maximize",
	render: de
}), pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function me(e, t) {
	return c(), n("svg", pe, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var he = o({
	name: "lucide-minimize",
	render: me
}), ge = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _e(e, t) {
	return c(), n("svg", ge, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var ve = o({
	name: "lucide-maximize-2",
	render: _e
}), ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function be(e, t) {
	return c(), n("svg", ye, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var xe = o({
	name: "lucide-cast",
	render: be
}), Se = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ce(e, t) {
	return c(), n("svg", Se, [...t[0] ||= [r("g", {
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
var we = o({
	name: "lucide-settings",
	render: Ce
}), Te = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ee(e, t) {
	return c(), n("svg", Te, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var De = o({
	name: "lucide-gauge",
	render: Ee
}), Oe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ke(e, t) {
	return c(), n("svg", Oe, [...t[0] ||= [r("g", {
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
var Ae = o({
	name: "lucide-film",
	render: ke
}), je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Me(e, t) {
	return c(), n("svg", je, [...t[0] ||= [r("g", {
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
var Ne = o({
	name: "lucide-image",
	render: Me
}), Pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fe(e, t) {
	return c(), n("svg", Pe, [...t[0] ||= [r("g", {
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
var Ie = o({
	name: "lucide-music",
	render: Fe
}), Le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Re(e, t) {
	return c(), n("svg", Le, [...t[0] ||= [r("g", {
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
var ze = o({
	name: "lucide-tv",
	render: Re
}), Be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ve(e, t) {
	return c(), n("svg", Be, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
	}, null, -1)]]);
}
var He = o({
	name: "lucide-book",
	render: Ve
}), Ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function We(e, t) {
	return c(), n("svg", Ue, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var Ge = o({
	name: "lucide-headphones",
	render: We
}), Ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qe(e, t) {
	return c(), n("svg", Ke, [...t[0] ||= [i("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M6 12c0-1.7.7-3.2 1.8-4.2\"></path><circle cx=\"12\" cy=\"12\" r=\"2\"></circle><path d=\"M18 12c0 1.7-.7 3.2-1.8 4.2\"></path></g>", 1)]]);
}
var Je = o({
	name: "lucide-disc-3",
	render: qe
}), Ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xe(e, t) {
	return c(), n("svg", Ye, [...t[0] ||= [r("g", {
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
var Ze = o({
	name: "lucide-mic-2",
	render: Xe
}), Qe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $e(e, t) {
	return c(), n("svg", Qe, [...t[0] ||= [r("g", {
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
var et = o({
	name: "lucide-video",
	render: $e
}), tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nt(e, t) {
	return c(), n("svg", tt, [...t[0] ||= [r("g", {
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
var rt = o({
	name: "lucide-search",
	render: nt
}), it = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function at(e, t) {
	return c(), n("svg", it, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var ot = o({
	name: "lucide-sliders-horizontal",
	render: at
}), st = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ct(e, t) {
	return c(), n("svg", st, [...t[0] ||= [r("g", {
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
var lt = o({
	name: "lucide-calendar",
	render: ct
}), ut = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dt(e, t) {
	return c(), n("svg", ut, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var ft = o({
	name: "lucide-arrow-up-down",
	render: dt
}), pt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mt(e, t) {
	return c(), n("svg", pt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var ht = o({
	name: "lucide-star",
	render: mt
}), gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _t(e, t) {
	return c(), n("svg", gt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var vt = o({
	name: "lucide-list",
	render: _t
}), yt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bt(e, t) {
	return c(), n("svg", yt, [...t[0] ||= [i("<g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><rect width=\"7\" height=\"7\" x=\"3\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"3\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"14\" y=\"14\" rx=\"1\"></rect><rect width=\"7\" height=\"7\" x=\"3\" y=\"14\" rx=\"1\"></rect></g>", 1)]]);
}
var xt = o({
	name: "lucide-layout-grid",
	render: bt
}), St = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ct(e, t) {
	return c(), n("svg", St, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "M2 3v18" }),
		r("rect", {
			width: "12",
			height: "18",
			x: "6",
			y: "3",
			rx: "2"
		}),
		r("path", { d: "M22 3v18" })
	], -1)]]);
}
var wt = o({
	name: "lucide-gallery-horizontal",
	render: Ct
}), Tt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Et(e, t) {
	return c(), n("svg", Tt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [
		r("path", { d: "M12 3v18" }),
		r("rect", {
			width: "18",
			height: "18",
			x: "3",
			y: "3",
			rx: "2"
		}),
		r("path", { d: "M3 9h18M3 15h18" })
	], -1)]]);
}
var Z = o({
	name: "lucide-table",
	render: Et
}), Dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ot(e, t) {
	return c(), n("svg", Dt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var kt = o({
	name: "lucide-plus",
	render: Ot
}), At = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jt(e, t) {
	return c(), n("svg", At, [...t[0] ||= [r("g", {
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
var Mt = o({
	name: "lucide-info",
	render: jt
}), Nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pt(e, t) {
	return c(), n("svg", Nt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Ft = o({
	name: "lucide-x",
	render: Pt
}), It = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Lt(e, t) {
	return c(), n("svg", It, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var Rt = o({
	name: "lucide-check",
	render: Lt
}), zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bt(e, t) {
	return c(), n("svg", zt, [...t[0] ||= [r("g", {
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
var Vt = o({
	name: "lucide-lock",
	render: Bt
}), Ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ut(e, t) {
	return c(), n("svg", Ht, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var Wt = o({
	name: "lucide-bookmark",
	render: Ut
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return c(), n("svg", Gt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var qt = o({
	name: "lucide-bookmark-plus",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return c(), n("svg", Jt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var Xt = o({
	name: "lucide-heart",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qt(e, t) {
	return c(), n("svg", Zt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var $t = o({
	name: "lucide-thumbs-up",
	render: Qt
}), en = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tn(e, t) {
	return c(), n("svg", en, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var nn = o({
	name: "lucide-thumbs-down",
	render: tn
}), rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function an(e, t) {
	return c(), n("svg", rn, [...t[0] ||= [r("g", {
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
var on = o({
	name: "lucide-user",
	render: an
}), sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cn(e, t) {
	return c(), n("svg", sn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var ln = o({
	name: "lucide-log-out",
	render: cn
}), un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dn(e, t) {
	return c(), n("svg", un, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var fn = o({
	name: "lucide-menu",
	render: dn
}), pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mn(e, t) {
	return c(), n("svg", pn, [...t[0] ||= [r("g", {
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
var hn = o({
	name: "lucide-more-horizontal",
	render: mn
}), gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _n(e, t) {
	return c(), n("svg", gn, [...t[0] ||= [r("g", {
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
var vn = o({
	name: "lucide-eye",
	render: _n
}), yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bn(e, t) {
	return c(), n("svg", yn, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), r("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var xn = o({
	name: "lucide-eye-off",
	render: bn
}), Sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cn(e, t) {
	return c(), n("svg", Sn, [...t[0] ||= [r("g", {
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
var wn = o({
	name: "lucide-key",
	render: Cn
}), Tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function En(e, t) {
	return c(), n("svg", Tn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
	}, null, -1)]]);
}
var Dn = o({
	name: "lucide-trash",
	render: En
}), On = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function kn(e, t) {
	return c(), n("svg", On, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var An = o({
	name: "lucide-arrow-left",
	render: kn
}), jn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Mn(e, t) {
	return c(), n("svg", jn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Nn = o({
	name: "lucide-arrow-right",
	render: Mn
}), Pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fn(e, t) {
	return c(), n("svg", Pn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var In = o({
	name: "lucide-arrow-up",
	render: Fn
}), Ln = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Rn(e, t) {
	return c(), n("svg", Ln, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var zn = o({
	name: "lucide-arrow-down",
	render: Rn
}), Bn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Vn(e, t) {
	return c(), n("svg", Bn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var Hn = o({
	name: "lucide-chevron-down",
	render: Vn
}), Un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Wn(e, t) {
	return c(), n("svg", Un, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var Gn = o({
	name: "lucide-chevron-up",
	render: Wn
}), Kn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function qn(e, t) {
	return c(), n("svg", Kn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var Jn = o({
	name: "lucide-chevron-left",
	render: qn
}), Yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Xn(e, t) {
	return c(), n("svg", Yn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var Zn = o({
	name: "lucide-chevron-right",
	render: Xn
}), Qn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $n(e, t) {
	return c(), n("svg", Qn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m11 17l-5-5l5-5m7 10l-5-5l5-5"
	}, null, -1)]]);
}
var er = o({
	name: "lucide-chevrons-left",
	render: $n
}), tr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function nr(e, t) {
	return c(), n("svg", tr, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 17l5-5l-5-5m7 10l5-5l-5-5"
	}, null, -1)]]);
}
var rr = o({
	name: "lucide-chevrons-right",
	render: nr
}), ir = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ar(e, t) {
	return c(), n("svg", ir, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var or = o({
	name: "lucide-loader-circle",
	render: ar
}), sr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cr(e, t) {
	return c(), n("svg", sr, [...t[0] ||= [r("g", {
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
var Q = o({
	name: "lucide-circle-alert",
	render: cr
}), lr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ur(e, t) {
	return c(), n("svg", lr, [...t[0] ||= [r("g", {
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
var dr = o({
	name: "lucide-circle-check",
	render: ur
}), fr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pr(e, t) {
	return c(), n("svg", fr, [...t[0] ||= [r("g", {
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
var mr = o({
	name: "lucide-circle-x",
	render: pr
}), hr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gr(e, t) {
	return c(), n("svg", hr, [...t[0] ||= [r("g", {
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
var _r = o({
	name: "lucide-sun",
	render: gr
}), vr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yr(e, t) {
	return c(), n("svg", vr, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var br = o({
	name: "lucide-moon",
	render: yr
}), xr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Sr(e, t) {
	return c(), n("svg", xr, [...t[0] ||= [r("g", {
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
var Cr = o({
	name: "lucide-monitor",
	render: Sr
}), wr = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tr(e, t) {
	return c(), n("svg", wr, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m-11 5L21 3m-3 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
	}, null, -1)]]);
}
//#endregion
//#region src/components/icon-registry.ts
var $ = {
	play: re,
	pause: d,
	"skip-back": m,
	"skip-forward": _,
	rewind: b,
	forward: C,
	volume: E,
	"volume-low": k,
	mute: M,
	shuffle: F,
	repeat: R,
	"repeat-1": V,
	"list-music": W,
	captions: q,
	"captions-off": X,
	pip: oe,
	theater: le,
	fullscreen: fe,
	"fullscreen-exit": he,
	expand: ve,
	cast: xe,
	settings: we,
	speed: De,
	film: Ae,
	image: Ne,
	music: Ie,
	tv: ze,
	book: He,
	headphones: Ge,
	disc: Je,
	mic: Ze,
	video: et,
	search: rt,
	filter: ot,
	calendar: lt,
	sort: ft,
	star: ht,
	list: vt,
	grid: xt,
	backdrop: wt,
	table: Z,
	plus: kt,
	info: Mt,
	x: Ft,
	check: Rt,
	lock: Vt,
	bookmark: Wt,
	"bookmark-plus": qt,
	heart: Xt,
	"thumbs-up": $t,
	"thumbs-down": nn,
	user: on,
	"log-out": ln,
	menu: fn,
	more: hn,
	eye: vn,
	"eye-off": xn,
	refresh: C,
	key: wn,
	trash: Dn,
	"arrow-left": An,
	"arrow-right": Nn,
	"arrow-up": In,
	"arrow-down": zn,
	"chevron-down": Hn,
	"chevron-up": Gn,
	"chevron-left": Jn,
	"chevron-right": Zn,
	"chevrons-left": er,
	"chevrons-right": rr,
	spinner: or,
	alert: Q,
	"alert-circle": Q,
	success: dr,
	error: mr,
	sun: _r,
	moon: br,
	monitor: Cr,
	"external-link": o({
		name: "lucide-external-link",
		render: Tr
	})
};
Object.keys($);
//#endregion
//#region src/components/Icon.vue
var Er = /* @__PURE__ */ a({
	__name: "Icon",
	props: {
		name: {},
		size: { default: void 0 },
		label: { default: void 0 },
		strokeWidth: { default: void 0 }
	},
	setup(n) {
		let r = n, i = e(() => $[r.name]), a = e(() => r.size === void 0 ? void 0 : typeof r.size == "number" ? `${r.size}px` : r.size);
		return (e, r) => (c(), t(ee(i.value), {
			class: "phlix-icon",
			style: s(a.value ? { fontSize: a.value } : void 0),
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
export { Er as t };

//# sourceMappingURL=Icon-ZHw1Bisb.js.map