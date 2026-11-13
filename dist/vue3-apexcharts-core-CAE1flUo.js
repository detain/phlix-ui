import { n as e } from "./MetricsPage-C4wUDdQ9.js";
import { defineComponent as t, getCurrentInstance as n, h as r, nextTick as i, onBeforeMount as a, onBeforeUnmount as o, onMounted as s, ref as c, shallowRef as l, toRefs as u, watch as d } from "vue";
// ../../phlix-ui/node_modules/vue3-apexcharts/dist/vue3-apexcharts-core.js
var f = (e, t) => {
	if (typeof e == "function" || typeof e != "object" || !e || e instanceof Date || e instanceof RegExp) return e;
	if (t.has(e)) return t.get(e);
	if (Array.isArray(e)) {
		let n = Array(e.length);
		return t.set(e, n), e.forEach((e, r) => {
			n[r] = f(e, t);
		}), n;
	}
	let n = {};
	t.set(e, n);
	for (let [r, i] of Object.entries(e)) n[r] = f(i, t);
	return n;
}, p = (e) => f(e, /* @__PURE__ */ new WeakMap()), m = [
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
], h = t({
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
	emits: m,
	setup(t, { emit: r }) {
		let f = c(null), h = l(null), g = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, _ = (e, t) => {
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
			return g(e) && g(t) && Object.keys(t).forEach((r) => {
				g(t[r]) && r in e ? n[r] = _(e[r], t[r]) : Object.assign(n, { [r]: t[r] });
			}), n;
		}, v = async () => {
			if (await i(), h.value) return;
			let n = {
				chart: {
					type: t.type || t.options.chart && t.options.chart.type || "line",
					height: t.height,
					width: t.width,
					events: {}
				},
				series: p(t.series)
			}, a = t.options.chart ? t.options.chart.events : null;
			m.forEach((e) => {
				let t = (...t) => r(e, ...t);
				n.chart.events[e] = (...n) => {
					t(...n), a && a.hasOwnProperty(e) && a[e](...n);
				};
			});
			let o = _(t.options, n);
			return h.value = new e(f.value, o), h.value.render();
		}, y = () => (b(), v()), b = () => {
			h.value.destroy(), h.value = null;
		}, x = (e, t) => h.value.updateSeries(e, t), S = (e, t, n, r) => h.value.updateOptions(e, t, n, r), C = (e) => h.value.toggleSeries(e), w = (e) => {
			h.value.showSeries(e);
		}, T = (e) => {
			h.value.hideSeries(e);
		}, E = (e, t) => h.value.appendSeries(e, t), D = () => {
			h.value.resetSeries();
		}, O = (e, t) => {
			h.value.toggleDataPointSelection(e, t);
		}, k = (e) => h.value.appendData(e), A = (e, t) => h.value.zoomX(e, t), j = (e) => h.value.dataURI(e), M = (e) => h.value.setLocale(e), N = (e, t) => {
			h.value.addXaxisAnnotation(e, t);
		}, P = (e, t) => {
			h.value.addYaxisAnnotation(e, t);
		}, F = (e, t) => {
			h.value.addPointAnnotation(e, t);
		}, I = (e, t) => {
			h.value.removeAnnotation(e, t);
		}, L = () => {
			h.value.clearAnnotations();
		};
		a(() => {
			window.ApexCharts = e;
		}), s(() => {
			f.value = n().proxy.$el, v();
		}), o(() => {
			h.value && b();
		});
		let R = u(t), z = null, B = (e) => {
			z || (z = {
				options: !1,
				series: !1
			}, i(() => {
				let e = z;
				if (z = null, !h.value) v();
				else if (e.options && e.series) {
					let e = p(t.options);
					e.series = p(t.series), h.value.updateOptions(e);
				} else e.options ? h.value.updateOptions(p(t.options)) : e.series && h.value.updateSeries(p(t.series));
			})), z[e] = !0;
		};
		return d(R.options, () => {
			B("options");
		}), d(R.series, () => {
			B("series");
		}, { deep: !0 }), d(R.type, () => {
			y();
		}), d(R.width, () => {
			y();
		}), d(R.height, () => {
			y();
		}), {
			chart: h,
			init: v,
			refresh: y,
			destroy: b,
			updateOptions: S,
			updateSeries: x,
			toggleSeries: C,
			showSeries: w,
			hideSeries: T,
			resetSeries: D,
			zoomX: A,
			toggleDataPointSelection: O,
			appendData: k,
			appendSeries: E,
			addXaxisAnnotation: N,
			addYaxisAnnotation: P,
			addPointAnnotation: F,
			removeAnnotation: I,
			clearAnnotations: L,
			setLocale: M,
			dataURI: j
		};
	},
	render() {
		return r("div", { class: "vue-apexcharts" });
	}
});
h.install = (e) => {
	e.component(h.name, h);
};
export { h as default };

//# sourceMappingURL=vue3-apexcharts-core-CAE1flUo.js.map