import { t as e } from "./core.esm-CG6mUIn9.js";
import { defineComponent as t, getCurrentInstance as n, h as r, nextTick as i, onBeforeMount as a, onBeforeUnmount as o, onMounted as s, ref as c, toRefs as l, watch as u } from "vue";
//#region node_modules/vue3-apexcharts/dist/vue3-apexcharts-core.js
var d = [
	"animationEnd",
	"beforeMount",
	"mounted",
	"updated",
	"click",
	"mouseMove",
	"mouseLeave",
	"legendClick",
	"markerClick",
	"selection",
	"dataPointSelection",
	"dataPointMouseEnter",
	"dataPointMouseLeave",
	"beforeZoom",
	"beforeResetZoom",
	"zoomed",
	"scrolled",
	"brushScrolled"
], f = t({
	name: "apexchart",
	props: {
		options: { type: Object },
		type: { type: String },
		series: {
			type: Array,
			required: !0
		},
		width: { default: "100%" },
		height: { default: "auto" }
	},
	emits: d,
	setup(t, { emit: r }) {
		let f = c(null), p = c(null), m = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, h = (e, t) => {
			typeof Object.assign != "function" && function() {
				Object.assign = function(e) {
					if (e == null) throw TypeError("Cannot convert undefined or null to object");
					let t = Object(e);
					for (let e = 1; e < arguments.length; e++) {
						let n = arguments[e];
						if (n != null) for (let e in n) n.hasOwnProperty(e) && (t[e] = n[e]);
					}
					return t;
				};
			}();
			let n = Object.assign({}, e);
			return m(e) && m(t) && Object.keys(t).forEach((r) => {
				m(t[r]) && r in e ? n[r] = h(e[r], t[r]) : Object.assign(n, { [r]: t[r] });
			}), n;
		}, g = (e) => JSON.parse(JSON.stringify(e)), _ = async () => {
			if (await i(), p.value) return;
			let n = {
				chart: {
					type: t.type || t.options.chart && t.options.chart.type || "line",
					height: t.height,
					width: t.width,
					events: {}
				},
				series: g(t.series)
			}, a = t.options.chart ? t.options.chart.events : null;
			d.forEach((e) => {
				let t = (...t) => r(e, ...t);
				n.chart.events[e] = (...n) => {
					t(...n), a && a.hasOwnProperty(e) && a[e](...n);
				};
			});
			let o = h(t.options, n);
			return p.value = new e(f.value, o), p.value.render();
		}, v = () => (y(), _()), y = () => {
			p.value.destroy(), p.value = null;
		}, b = (e, t) => p.value.updateSeries(e, t), x = (e, t, n, r) => p.value.updateOptions(e, t, n, r), S = (e) => p.value.toggleSeries(e), C = (e) => {
			p.value.showSeries(e);
		}, w = (e) => {
			p.value.hideSeries(e);
		}, T = (e, t) => p.value.appendSeries(e, t), E = () => {
			p.value.resetSeries();
		}, D = (e, t) => {
			p.value.toggleDataPointSelection(e, t);
		}, O = (e) => p.value.appendData(e), k = (e, t) => p.value.zoomX(e, t), A = (e) => p.value.dataURI(e), j = (e) => p.value.setLocale(e), M = (e, t) => {
			p.value.addXaxisAnnotation(e, t);
		}, N = (e, t) => {
			p.value.addYaxisAnnotation(e, t);
		}, P = (e, t) => {
			p.value.addPointAnnotation(e, t);
		}, F = (e, t) => {
			p.value.removeAnnotation(e, t);
		}, I = () => {
			p.value.clearAnnotations();
		};
		a(() => {
			window.ApexCharts = e;
		}), s(() => {
			f.value = n().proxy.$el, _();
		}), o(() => {
			p.value && y();
		});
		let L = l(t), R = null, z = (e) => {
			R || (R = {
				options: !1,
				series: !1
			}, i(() => {
				let e = R;
				if (R = null, !p.value) {
					_();
					return;
				}
				if (e.options && e.series) {
					let e = g(t.options);
					e.series = g(t.series), p.value.updateOptions(e);
				} else e.options ? p.value.updateOptions(g(t.options)) : e.series && p.value.updateSeries(g(t.series));
			})), R[e] = !0;
		};
		return u(L.options, () => {
			z("options");
		}), u(L.series, () => {
			z("series");
		}, { deep: !0 }), u(L.type, () => {
			v();
		}), u(L.width, () => {
			v();
		}), u(L.height, () => {
			v();
		}), {
			chart: p,
			init: _,
			refresh: v,
			destroy: y,
			updateOptions: x,
			updateSeries: b,
			toggleSeries: S,
			showSeries: C,
			hideSeries: w,
			resetSeries: E,
			zoomX: k,
			toggleDataPointSelection: D,
			appendData: O,
			appendSeries: T,
			addXaxisAnnotation: M,
			addYaxisAnnotation: N,
			addPointAnnotation: P,
			removeAnnotation: F,
			clearAnnotations: I,
			setLocale: j,
			dataURI: A
		};
	},
	render() {
		return r("div", { class: "vue-apexcharts" });
	}
});
f.install = (e) => {
	e.component(f.name, f);
};
//#endregion
export { f as default };

//# sourceMappingURL=vue3-apexcharts-core-Bc6O7F62.js.map