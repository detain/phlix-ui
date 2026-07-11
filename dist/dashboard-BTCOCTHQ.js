//#region src/api/admin/dashboard.ts
function e(e, t = "") {
	return typeof e == "string" ? e : e == null ? t : typeof e == "number" || typeof e == "boolean" ? String(e) : t;
}
function t(e, t = 0) {
	return typeof e == "number" && Number.isFinite(e) ? e : typeof e == "string" && e.trim() !== "" && Number.isFinite(Number(e)) ? Number(e) : t;
}
function n(e) {
	return Array.isArray(e) ? e : [];
}
function r(n) {
	return {
		session_id: e(n.session_id ?? n.stream_id),
		user_id: e(n.user_id),
		user_name: e(n.user_name ?? n.username),
		media_item_id: e(n.media_item_id),
		media_title: e(n.media_title),
		media_type: e(n.media_type),
		progress_percent: t(n.progress_percent),
		started_at: e(n.started_at)
	};
}
function i(n) {
	return {
		user_id: e(n.user_id),
		user_name: e(n.user_name ?? n.username),
		total_watch_time_seconds: t(n.total_watch_time_seconds ?? n.total_watch_time),
		play_count: t(n.play_count),
		last_seen: e(n.last_seen)
	};
}
function a(n) {
	return {
		media_item_id: e(n.media_item_id),
		media_title: e(n.media_title ?? n.title),
		media_type: e(n.media_type ?? n.type),
		play_count: t(n.play_count),
		total_duration_seconds: t(n.total_duration_seconds ?? n.total_duration),
		last_played_at: e(n.last_played_at)
	};
}
function o(t) {
	let n = typeof t.details == "object" && t.details !== null ? t.details : {};
	return {
		id: e(t.id),
		event_type: e(t.event_type),
		user_id: e(t.user_id),
		user_name: e(t.user_name ?? t.username),
		media_item_id: e(t.media_item_id ?? n.media_item_id),
		media_title: e(t.media_title ?? n.media_title),
		created_at: e(t.created_at ?? t.occurred_at),
		details: typeof t.details == "string" ? t.details : ""
	};
}
var s = class {
	client;
	constructor(e) {
		this.client = e;
	}
	async getNowPlaying() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/now-playing");
		return n(e).map(r);
	}
	async getTopUsers(e, t) {
		let r = {};
		e !== void 0 && (r.limit = String(e)), t !== void 0 && (r.days = String(t));
		let { data: a } = await this.client.get("/api/v1/admin/dashboard/top-users", Object.keys(r).length ? r : void 0);
		return n(a).map(i);
	}
	async getTopMedia(e, t) {
		let r = {};
		e !== void 0 && (r.limit = String(e)), t !== void 0 && (r.days = String(t));
		let { data: i } = await this.client.get("/api/v1/admin/dashboard/top-media", Object.keys(r).length ? r : void 0);
		return n(i).map(a);
	}
	async getStorage() {
		let { data: e } = await this.client.get("/api/v1/admin/dashboard/storage");
		return Array.isArray(e) ? e : Array.isArray(e?.items) ? e.items : [];
	}
	async getActivity(e) {
		let t = e === void 0 ? void 0 : { limit: String(e) }, { data: r } = await this.client.get("/api/v1/admin/dashboard/activity", t);
		return n(r).map(o);
	}
};
//#endregion
export { s as t };

//# sourceMappingURL=dashboard-BTCOCTHQ.js.map