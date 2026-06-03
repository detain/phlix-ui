//#region src/app/admin.ts
function e(e = "/app") {
	return [{
		path: `${e}/admin`,
		component: () => import("./AdminLayout-CeqLouST.js"),
		props: { base: e },
		children: [
			{
				path: "",
				redirect: { name: "admin-dashboard" }
			},
			{
				path: "dashboard",
				name: "admin-dashboard",
				component: () => import("./DashboardPage-Dk-8LrFf.js")
			},
			{
				path: "users",
				name: "admin-users",
				component: () => import("./UsersPage-D3eL3ggr.js")
			},
			{
				path: "logs",
				name: "admin-logs",
				component: () => import("./LogsPage-kcGb2Lrt.js")
			},
			{
				path: "webhooks",
				name: "admin-webhooks",
				component: () => import("./WebhooksPage-D3QGhs5b.js")
			},
			{
				path: "services",
				name: "admin-services",
				component: () => import("./ServicesPage-Bq_rvKfP.js")
			},
			{
				path: "integrations",
				name: "admin-integrations",
				component: () => import("./IntegrationsPage-aWkwWsoS.js")
			},
			{
				path: "backup",
				name: "admin-backup",
				component: () => import("./BackupPage-BUWYJxjK.js")
			},
			{
				path: "cast-devices",
				name: "admin-cast",
				component: () => import("./CastDevicesPage-6kqK6OzJ.js")
			},
			{
				path: "dlna",
				name: "admin-dlna",
				component: () => import("./DlnaServerPage-CnwbXlhV.js")
			},
			{
				path: "remote-access",
				name: "admin-remote-access",
				component: () => import("./RemoteAccessPage-BOqaJazE.js")
			},
			{
				path: "livetv",
				name: "admin-livetv",
				component: () => import("./LiveTvPage-DjPAIckK.js")
			},
			{
				path: "collections",
				name: "admin-collections",
				component: () => import("./CollectionsPage-BXS7Rb4I.js")
			},
			{
				path: "history",
				name: "admin-history",
				component: () => import("./HistoryPage-BJUbXx2N.js")
			},
			{
				path: "syncplay",
				name: "admin-syncplay",
				component: () => import("./SyncPlayPage-8Czqv8UI.js")
			},
			{
				path: "libraries",
				name: "admin-libraries",
				component: () => import("./LibrariesPage-BYE7S405.js")
			},
			{
				path: "settings",
				name: "admin-settings",
				component: () => import("./SettingsPage-Dh0DJXfV.js")
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

//# sourceMappingURL=admin-BYrrUKO2.js.map