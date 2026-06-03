//#region src/app/admin.ts
function e(e = "/app") {
	return [{
		path: `${e}/admin`,
		component: () => import("./AdminLayout-Bkg687FE.js"),
		props: { base: e },
		children: [
			{
				path: "",
				redirect: { name: "admin-dashboard" }
			},
			{
				path: "dashboard",
				name: "admin-dashboard",
				component: () => import("./DashboardPage-DIwb_uQb.js")
			},
			{
				path: "users",
				name: "admin-users",
				component: () => import("./UsersPage-Ds3OACCf.js")
			},
			{
				path: "logs",
				name: "admin-logs",
				component: () => import("./LogsPage-DqMrIVhg.js")
			},
			{
				path: "webhooks",
				name: "admin-webhooks",
				component: () => import("./WebhooksPage-BZj_qALL.js")
			},
			{
				path: "services",
				name: "admin-services",
				component: () => import("./ServicesPage-Bl0X_ZFA.js")
			},
			{
				path: "integrations",
				name: "admin-integrations",
				component: () => import("./IntegrationsPage-C_sBSmpA.js")
			},
			{
				path: "backup",
				name: "admin-backup",
				component: () => import("./BackupPage-CngaTjoZ.js")
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
				component: () => import("./RemoteAccessPage-B2vy4ih6.js")
			},
			{
				path: "livetv",
				name: "admin-livetv",
				component: () => import("./LiveTvPage-nVwbzoa9.js")
			},
			{
				path: "collections",
				name: "admin-collections",
				component: () => import("./CollectionsPage-ClyOfpIK.js")
			},
			{
				path: "history",
				name: "admin-history",
				component: () => import("./HistoryPage-DRXBbxTR.js")
			},
			{
				path: "syncplay",
				name: "admin-syncplay",
				component: () => import("./SyncPlayPage-BXm-tLjJ.js")
			},
			{
				path: "libraries",
				name: "admin-libraries",
				component: () => import("./LibrariesPage--nCR1SoW.js")
			},
			{
				path: "settings",
				name: "admin-settings",
				component: () => import("./SettingsPage-D2EdtG2a.js")
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

//# sourceMappingURL=admin-DMRCbE3w.js.map