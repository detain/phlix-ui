//#region src/app/admin.ts
function e(e = "/app") {
	return [{
		path: `${e}/admin`,
		component: () => import("./AdminLayout-CwxW2G07.js"),
		props: { base: e },
		children: [
			{
				path: "",
				redirect: { name: "admin-dashboard" }
			},
			{
				path: "dashboard",
				name: "admin-dashboard",
				component: () => import("./DashboardPage-D1ZQ3pKj.js")
			},
			{
				path: "users",
				name: "admin-users",
				component: () => import("./UsersPage-BZ0iHOwu.js")
			},
			{
				path: "logs",
				name: "admin-logs",
				component: () => import("./LogsPage-Dvf8lep1.js")
			},
			{
				path: "webhooks",
				name: "admin-webhooks",
				component: () => import("./WebhooksPage-ye3fBRJa.js")
			},
			{
				path: "services",
				name: "admin-services",
				component: () => import("./ServicesPage-Bl0X_ZFA.js")
			},
			{
				path: "integrations",
				name: "admin-integrations",
				component: () => import("./IntegrationsPage-BJBAehMw.js")
			},
			{
				path: "backup",
				name: "admin-backup",
				component: () => import("./BackupPage-1eD_HLYX.js")
			},
			{
				path: "cast-devices",
				name: "admin-cast",
				component: () => import("./CastDevicesPage-DentGPYn.js")
			},
			{
				path: "dlna",
				name: "admin-dlna",
				component: () => import("./DlnaServerPage-BF7ouXsL.js")
			},
			{
				path: "remote-access",
				name: "admin-remote-access",
				component: () => import("./RemoteAccessPage-DvZN51bR.js")
			},
			{
				path: "livetv",
				name: "admin-livetv",
				component: () => import("./LiveTvPage-CwGsCRlq.js")
			},
			{
				path: "collections",
				name: "admin-collections",
				component: () => import("./CollectionsPage-hZRM_Y0K.js")
			},
			{
				path: "history",
				name: "admin-history",
				component: () => import("./HistoryPage-Bp7XNXe0.js")
			},
			{
				path: "syncplay",
				name: "admin-syncplay",
				component: () => import("./SyncPlayPage-nMOZjbjJ.js")
			},
			{
				path: "libraries",
				name: "admin-libraries",
				component: () => import("./LibrariesPage-DvYXsdNr.js")
			},
			{
				path: "settings",
				name: "admin-settings",
				component: () => import("./SettingsPage-eIfgt3ex.js")
			}
		]
	}];
}
function t(e = "/app") {
	let t = `${e}/admin`;
	return [{
		id: "admin",
		label: "Admin",
		icon: "settings",
		children: [
			{
				id: "admin-dashboard",
				label: "Dashboard",
				icon: "speed",
				to: `${t}/dashboard`
			},
			{
				id: "admin-users",
				label: "Users",
				icon: "user",
				to: `${t}/users`
			},
			{
				id: "admin-logs",
				label: "Logs",
				icon: "list",
				to: `${t}/logs`
			},
			{
				id: "admin-webhooks",
				label: "Webhooks",
				icon: "settings",
				to: `${t}/webhooks`
			},
			{
				id: "admin-services",
				label: "Services",
				icon: "star",
				to: `${t}/services`
			},
			{
				id: "admin-integrations",
				label: "Integrations",
				icon: "settings",
				to: `${t}/integrations`
			},
			{
				id: "admin-backup",
				label: "Backup",
				icon: "bookmark",
				to: `${t}/backup`
			},
			{
				id: "admin-cast",
				label: "Cast Devices",
				icon: "cast",
				to: `${t}/cast-devices`
			},
			{
				id: "admin-dlna",
				label: "DLNA Server",
				icon: "monitor",
				to: `${t}/dlna`
			},
			{
				id: "admin-remote-access",
				label: "Remote Access",
				icon: "expand",
				to: `${t}/remote-access`
			},
			{
				id: "admin-livetv",
				label: "Live TV / DVR",
				icon: "tv",
				to: `${t}/livetv`
			},
			{
				id: "admin-collections",
				label: "Collections",
				icon: "list",
				to: `${t}/collections`
			},
			{
				id: "admin-history",
				label: "Watch History",
				icon: "film",
				to: `${t}/history`
			},
			{
				id: "admin-syncplay",
				label: "SyncPlay",
				icon: "play",
				to: `${t}/syncplay`
			},
			{
				id: "admin-libraries",
				label: "Libraries",
				icon: "image",
				to: `${t}/libraries`
			},
			{
				id: "admin-settings",
				label: "Settings",
				icon: "settings",
				to: `${t}/settings`
			}
		]
	}];
}
//#endregion
export { e as n, t };

//# sourceMappingURL=admin-Dr_pRNXD.js.map