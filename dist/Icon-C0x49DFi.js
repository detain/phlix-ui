import { computed as e, createBlock as t, createElementBlock as n, createElementVNode as r, defineComponent as i, markRaw as a, normalizeStyle as ee, openBlock as o, resolveDynamicComponent as te } from "vue";
//#region ~icons/lucide/play
var s = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function c(e, t) {
	return o(), n("svg", s, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
	}, null, -1)]]);
}
var l = a({
	name: "lucide-play",
	render: c
}), u = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function d(e, t) {
	return o(), n("svg", u, [...t[0] ||= [r("g", {
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
var f = a({
	name: "lucide-pause",
	render: d
}), p = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function m(e, t) {
	return o(), n("svg", p, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432zM3 20V4"
	}, null, -1)]]);
}
var h = a({
	name: "lucide-skip-back",
	render: m
}), g = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _(e, t) {
	return o(), n("svg", g, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 4v16M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
	}, null, -1)]]);
}
var v = a({
	name: "lucide-skip-forward",
	render: _
}), y = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function b(e, t) {
	return o(), n("svg", y, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" }), r("path", { d: "M3 3v5h5" })], -1)]]);
}
var x = a({
	name: "lucide-rotate-ccw",
	render: b
}), S = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function C(e, t) {
	return o(), n("svg", S, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" }), r("path", { d: "M21 3v5h-5" })], -1)]]);
}
var w = a({
	name: "lucide-rotate-cw",
	render: C
}), T = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function E(e, t) {
	return o(), n("svg", T, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6m3.364 3.364a9 9 0 0 0 0-12.728"
	}, null, -1)]]);
}
var D = a({
	name: "lucide-volume-2",
	render: E
}), O = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function k(e, t) {
	return o(), n("svg", O, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM16 9a5 5 0 0 1 0 6"
	}, null, -1)]]);
}
var A = a({
	name: "lucide-volume-1",
	render: k
}), j = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function M(e, t) {
	return o(), n("svg", j, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298zM22 9l-6 6m0-6l6 6"
	}, null, -1)]]);
}
var N = a({
	name: "lucide-volume-x",
	render: M
}), P = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function F(e, t) {
	return o(), n("svg", P, [...t[0] ||= [r("g", {
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
var I = a({
	name: "lucide-captions",
	render: F
}), L = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function R(e, t) {
	return o(), n("svg", L, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10.5 5H19a2 2 0 0 1 2 2v8.5M17 11h-.5m2.5 8H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2M2 2l20 20M7 11h4m-4 4h2.5"
	}, null, -1)]]);
}
var z = a({
	name: "lucide-captions-off",
	render: R
}), B = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function V(e, t) {
	return o(), n("svg", B, [...t[0] ||= [r("g", {
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
var H = a({
	name: "lucide-picture-in-picture-2",
	render: V
}), U = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function W(e, t) {
	return o(), n("svg", U, [...t[0] ||= [r("rect", {
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
var G = a({
	name: "lucide-rectangle-horizontal",
	render: W
}), K = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function q(e, t) {
	return o(), n("svg", K, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3m8 0h3a2 2 0 0 0 2-2v-3"
	}, null, -1)]]);
}
var J = a({
	name: "lucide-maximize",
	render: q
}), Y = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function X(e, t) {
	return o(), n("svg", Y, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m8 0v-3a2 2 0 0 1 2-2h3"
	}, null, -1)]]);
}
var Z = a({
	name: "lucide-minimize",
	render: X
}), Q = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ne(e, t) {
	return o(), n("svg", Q, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 3h6v6m0-6l-7 7M3 21l7-7m-1 7H3v-6"
	}, null, -1)]]);
}
var re = a({
	name: "lucide-maximize-2",
	render: ne
}), ie = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ae(e, t) {
	return o(), n("svg", ie, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6M2 12a9 9 0 0 1 8 8m-8-4a5 5 0 0 1 4 4m-4 0h.01"
	}, null, -1)]]);
}
var oe = a({
	name: "lucide-cast",
	render: ae
}), se = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ce(e, t) {
	return o(), n("svg", se, [...t[0] ||= [r("g", {
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
var le = a({
	name: "lucide-settings",
	render: ce
}), ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function de(e, t) {
	return o(), n("svg", ue, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 14l4-4M3.34 19a10 10 0 1 1 17.32 0"
	}, null, -1)]]);
}
var fe = a({
	name: "lucide-gauge",
	render: de
}), pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function me(e, t) {
	return o(), n("svg", pe, [...t[0] ||= [r("g", {
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
var he = a({
	name: "lucide-film",
	render: me
}), ge = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _e(e, t) {
	return o(), n("svg", ge, [...t[0] ||= [r("g", {
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
var ve = a({
	name: "lucide-image",
	render: _e
}), ye = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function be(e, t) {
	return o(), n("svg", ye, [...t[0] ||= [r("g", {
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
var xe = a({
	name: "lucide-music",
	render: be
}), Se = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ce(e, t) {
	return o(), n("svg", Se, [...t[0] ||= [r("g", {
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
var we = a({
	name: "lucide-tv",
	render: Ce
}), Te = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ee(e, t) {
	return o(), n("svg", Te, [...t[0] ||= [r("g", {
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
var De = a({
	name: "lucide-search",
	render: Ee
}), Oe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ke(e, t) {
	return o(), n("svg", Oe, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M10 5H3m9 14H3M14 3v4m2 10v4m5-9h-9m9 7h-5m5-14h-7m-6 5v4m0-2H3"
	}, null, -1)]]);
}
var Ae = a({
	name: "lucide-sliders-horizontal",
	render: ke
}), je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Me(e, t) {
	return o(), n("svg", je, [...t[0] ||= [r("g", {
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
var Ne = a({
	name: "lucide-calendar",
	render: Me
}), Pe = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Fe(e, t) {
	return o(), n("svg", Pe, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m21 16l-4 4l-4-4m4 4V4M3 8l4-4l4 4M7 4v16"
	}, null, -1)]]);
}
var Ie = a({
	name: "lucide-arrow-up-down",
	render: Fe
}), Le = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Re(e, t) {
	return o(), n("svg", Le, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"
	}, null, -1)]]);
}
var ze = a({
	name: "lucide-star",
	render: Re
}), Be = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ve(e, t) {
	return o(), n("svg", Be, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M3 5h.01M3 12h.01M3 19h.01M8 5h13M8 12h13M8 19h13"
	}, null, -1)]]);
}
var He = a({
	name: "lucide-list",
	render: Ve
}), Ue = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function We(e, t) {
	return o(), n("svg", Ue, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7v14"
	}, null, -1)]]);
}
var Ge = a({
	name: "lucide-plus",
	render: We
}), Ke = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function $(e, t) {
	return o(), n("svg", Ke, [...t[0] ||= [r("g", {
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
var qe = a({
	name: "lucide-info",
	render: $
}), Je = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ye(e, t) {
	return o(), n("svg", Je, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M18 6L6 18M6 6l12 12"
	}, null, -1)]]);
}
var Xe = a({
	name: "lucide-x",
	render: Ye
}), Ze = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qe(e, t) {
	return o(), n("svg", Ze, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20 6L9 17l-5-5"
	}, null, -1)]]);
}
var $e = a({
	name: "lucide-check",
	render: Qe
}), et = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tt(e, t) {
	return o(), n("svg", et, [...t[0] ||= [r("g", {
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
var nt = a({
	name: "lucide-lock",
	render: tt
}), rt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function it(e, t) {
	return o(), n("svg", rt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var at = a({
	name: "lucide-bookmark",
	render: it
}), ot = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function st(e, t) {
	return o(), n("svg", ot, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 7v6m3-3H9m8-7a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
	}, null, -1)]]);
}
var ct = a({
	name: "lucide-bookmark-plus",
	render: st
}), lt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function ut(e, t) {
	return o(), n("svg", lt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
	}, null, -1)]]);
}
var dt = a({
	name: "lucide-heart",
	render: ut
}), ft = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function pt(e, t) {
	return o(), n("svg", ft, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88M7 10v12"
	}, null, -1)]]);
}
var mt = a({
	name: "lucide-thumbs-up",
	render: pt
}), ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function gt(e, t) {
	return o(), n("svg", ht, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88M17 14V2"
	}, null, -1)]]);
}
var _t = a({
	name: "lucide-thumbs-down",
	render: gt
}), vt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function yt(e, t) {
	return o(), n("svg", vt, [...t[0] ||= [r("g", {
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
var bt = a({
	name: "lucide-user",
	render: yt
}), xt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function St(e, t) {
	return o(), n("svg", xt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
	}, null, -1)]]);
}
var Ct = a({
	name: "lucide-log-out",
	render: St
}), wt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Tt(e, t) {
	return o(), n("svg", wt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M4 5h16M4 12h16M4 19h16"
	}, null, -1)]]);
}
var Et = a({
	name: "lucide-menu",
	render: Tt
}), Dt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ot(e, t) {
	return o(), n("svg", Dt, [...t[0] ||= [r("g", {
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
var kt = a({
	name: "lucide-more-horizontal",
	render: Ot
}), At = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function jt(e, t) {
	return o(), n("svg", At, [...t[0] ||= [r("g", {
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
var Mt = a({
	name: "lucide-eye",
	render: jt
}), Nt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Pt(e, t) {
	return o(), n("svg", Nt, [...t[0] ||= [r("g", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2"
	}, [r("path", { d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575a1 1 0 0 1 0 .696a10.8 10.8 0 0 1-1.444 2.49m-6.41-.679a3 3 0 0 1-4.242-4.242" }), r("path", { d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151a1 1 0 0 1 0-.696a10.75 10.75 0 0 1 4.446-5.143M2 2l20 20" })], -1)]]);
}
var Ft = a({
	name: "lucide-eye-off",
	render: Pt
}), It = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Lt(e, t) {
	return o(), n("svg", It, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m12 19l-7-7l7-7m7 7H5"
	}, null, -1)]]);
}
var Rt = a({
	name: "lucide-arrow-left",
	render: Lt
}), zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Bt(e, t) {
	return o(), n("svg", zt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M5 12h14m-7-7l7 7l-7 7"
	}, null, -1)]]);
}
var Vt = a({
	name: "lucide-arrow-right",
	render: Bt
}), Ht = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Ut(e, t) {
	return o(), n("svg", Ht, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m5 12l7-7l7 7m-7 7V5"
	}, null, -1)]]);
}
var Wt = a({
	name: "lucide-arrow-up",
	render: Ut
}), Gt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Kt(e, t) {
	return o(), n("svg", Gt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M12 5v14m7-7l-7 7l-7-7"
	}, null, -1)]]);
}
var qt = a({
	name: "lucide-arrow-down",
	render: Kt
}), Jt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Yt(e, t) {
	return o(), n("svg", Jt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m6 9l6 6l6-6"
	}, null, -1)]]);
}
var Xt = a({
	name: "lucide-chevron-down",
	render: Yt
}), Zt = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Qt(e, t) {
	return o(), n("svg", Zt, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m18 15l-6-6l-6 6"
	}, null, -1)]]);
}
var $t = a({
	name: "lucide-chevron-up",
	render: Qt
}), en = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function tn(e, t) {
	return o(), n("svg", en, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m15 18l-6-6l6-6"
	}, null, -1)]]);
}
var nn = a({
	name: "lucide-chevron-left",
	render: tn
}), rn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function an(e, t) {
	return o(), n("svg", rn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "m9 18l6-6l-6-6"
	}, null, -1)]]);
}
var on = a({
	name: "lucide-chevron-right",
	render: an
}), sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function cn(e, t) {
	return o(), n("svg", sn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M21 12a9 9 0 1 1-6.219-8.56"
	}, null, -1)]]);
}
var ln = a({
	name: "lucide-loader-circle",
	render: cn
}), un = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function dn(e, t) {
	return o(), n("svg", un, [...t[0] ||= [r("g", {
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
var fn = a({
	name: "lucide-circle-alert",
	render: dn
}), pn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function mn(e, t) {
	return o(), n("svg", pn, [...t[0] ||= [r("g", {
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
var hn = a({
	name: "lucide-circle-check",
	render: mn
}), gn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function _n(e, t) {
	return o(), n("svg", gn, [...t[0] ||= [r("g", {
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
var vn = a({
	name: "lucide-circle-x",
	render: _n
}), yn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function bn(e, t) {
	return o(), n("svg", yn, [...t[0] ||= [r("g", {
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
var xn = a({
	name: "lucide-sun",
	render: bn
}), Sn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function Cn(e, t) {
	return o(), n("svg", Sn, [...t[0] ||= [r("path", {
		fill: "none",
		stroke: "currentColor",
		"stroke-linecap": "round",
		"stroke-linejoin": "round",
		"stroke-width": "2",
		d: "M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
	}, null, -1)]]);
}
var wn = a({
	name: "lucide-moon",
	render: Cn
}), Tn = {
	viewBox: "0 0 24 24",
	width: "1em",
	height: "1em"
};
function En(e, t) {
	return o(), n("svg", Tn, [...t[0] ||= [r("g", {
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
var Dn = a({
	name: "lucide-monitor",
	render: En
}), On = /* @__PURE__ */ i({
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
			captions: I,
			"captions-off": z,
			pip: H,
			theater: G,
			fullscreen: J,
			"fullscreen-exit": Z,
			expand: re,
			cast: oe,
			settings: le,
			speed: fe,
			film: he,
			image: ve,
			music: xe,
			tv: we,
			search: De,
			filter: Ae,
			calendar: Ne,
			sort: Ie,
			star: ze,
			list: He,
			plus: Ge,
			info: qe,
			x: Xe,
			check: $e,
			lock: nt,
			bookmark: at,
			"bookmark-plus": ct,
			heart: dt,
			"thumbs-up": mt,
			"thumbs-down": _t,
			user: bt,
			"log-out": Ct,
			menu: Et,
			more: kt,
			eye: Mt,
			"eye-off": Ft,
			"arrow-left": Rt,
			"arrow-right": Vt,
			"arrow-up": Wt,
			"arrow-down": qt,
			"chevron-down": Xt,
			"chevron-up": $t,
			"chevron-left": nn,
			"chevron-right": on,
			spinner: ln,
			alert: fn,
			success: hn,
			error: vn,
			sun: xn,
			moon: wn,
			monitor: Dn
		}, i = n, a = e(() => r[i.name]), s = e(() => i.size === void 0 ? void 0 : typeof i.size == "number" ? `${i.size}px` : i.size);
		return (e, r) => (o(), t(te(a.value), {
			class: "phlix-icon",
			style: ee(s.value ? { fontSize: s.value } : void 0),
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
export { On as t };

//# sourceMappingURL=Icon-C0x49DFi.js.map