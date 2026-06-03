//#region src/app/admin.ts
function e(e = "/app") {
	return [{
		path: `${e}/admin`,
		component: () => import("./AdminLayout-Bs7jXzud.js"),
		props: { base: e },
		children: [
			{
				path: "",
				redirect: { name: "admin-dashboard" }
			},
			{
				path: "dashboard",
				name: "admin-dashboard",
				component: () => import("./DashboardPage-C7Cc_plR.js")
			},
			{
				path: "users",
				name: "admin-users",
				component: () => import("./UsersPage-D2sEkLq6.js")
			},
			{
				path: "logs",
				name: "admin-logs",
				component: () => import("./LogsPage-oMeF3-To.js")
			},
			{
				path: "webhooks",
				name: "admin-webhooks",
				component: () => import("./WebhooksPage-D-2EpPuA.js")
			},
			{
				path: "services",
				name: "admin-services",
				component: () => import("./ServicesPage-Bq_rvKfP.js")
			},
			{
				path: "integrations",
				name: "admin-integrations",
				component: () => import("./IntegrationsPage-DwwSDzI5.js")
			},
			{
				path: "backup",
				name: "admin-backup",
				component: () => import("./BackupPage-DcNYQ-Qp.js")
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
				component: () => import("./RemoteAccessPage-kWQ3RqQV.js")
			},
			{
				path: "livetv",
				name: "admin-livetv",
				component: () => import("./LiveTvPage-C1iZ2hbR.js")
			},
			{
				path: "collections",
				name: "admin-collections",
				component: () => import("./CollectionsPage-B65zsOyE.js")
			},
			{
				path: "history",
				name: "admin-history",
				component: () => import("./HistoryPage-CxQQfoZG.js")
			},
			{
				path: "syncplay",
				name: "admin-syncplay",
				component: () => import("./SyncPlayPage-DXTJT4eL.js")
			},
			{
				path: "libraries",
				name: "admin-libraries",
				component: () => import("./LibrariesPage-C-vlmhnT.js")
			},
			{
				path: "settings",
				name: "admin-settings",
				component: () => import("./SettingsPage-Bsib_4mZ.js")
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

//# sourceMappingURL=admin-D5b9-RYB.js.map