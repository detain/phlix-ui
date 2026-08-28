/**
 * S280 — the client route gate, phlix-ui admin layer.
 *
 * Every request-issuing method of every server-addressed `src/api/admin`
 * module is driven through {@link makeRouteGateServer} (404 on any url the
 * server does not register) and pinned TUPLE-EXACT against the generated
 * server manifest. See `routeGate.api.test.ts` for the harness contract.
 *
 * Two admin modules are MIXED server/hub surfaces and are partitioned
 * URL-by-URL:
 * - `users.ts` — the CRUD surface is server-addressed; the relay bandwidth
 *   trio (`GET …/{id}/bandwidth`, `PUT …/{id}/throttle`, `PUT …/{id}/quota`)
 *   is hub-only by the module's own docblock (S41/S42/S43) and is asserted in
 *   the hub partition.
 * - `servers.ts` — `GET /api/v1/servers` is server-registered; the fleet
 *   detail `GET /api/v1/servers/{id}` is hub-only.
 * - `hubDashboard.ts` — the hub app's dashboard page: `activity` is a shared
 *   server route, `summary` is hub-only.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { ApiClient } from '../client';
import { MemoryTokenStore } from './memoryTokenStore';
import { AdminBackupApi } from '../admin/backup';
import { AdminCastApi } from '../admin/cast';
import { AdminCollectionsApi } from '../admin/collections';
import { AdminDashboardApi } from '../admin/dashboard';
import { AdminDlnaServerApi } from '../admin/dlnaServer';
import { AdminDuplicatesApi } from '../admin/duplicates';
import { AdminHistoryApi } from '../admin/history';
import { AdminHubDashboardApi } from '../admin/hubDashboard';
import { AdminIntegrationsApi } from '../admin/integrations';
import { AdminLibrariesApi } from '../admin/libraries';
import { AdminLiveTvApi } from '../admin/liveTv';
import { AdminLogsApi } from '../admin/logs';
import { AdminMaintenanceApi } from '../admin/maintenance';
import { AdminMetadataSourcesApi } from '../admin/metadata-sources';
import { AdminMetricsApi } from '../admin/metrics';
import { AdminNetworkHealthApi } from '../admin/networkHealth';
import { AdminPluginsApi } from '../admin/plugins';
import { AdminRemoteAccessApi } from '../admin/remoteAccess';
import { AdminServersApi } from '../admin/servers';
import { AdminServicesApi } from '../admin/services';
import { AdminSettingsApi } from '../admin/settings';
import { AdminSyncPlayApi } from '../admin/syncPlay';
import { AdminTranscodingApi } from '../admin/transcoding';
import { AdminUpdatesApi } from '../admin/updates';
import { AdminUsersApi } from '../admin/users';
import { AdminWebhooksApi } from '../admin/webhooks';
import { makeRouteGateServer, driveGated, expectGateClean, isRegisteredRoute, type RouteGateServer } from './routeGateServer';

const BASE = 'https://media.example.com';

function makeClient(server: RouteGateServer): ApiClient {
    return new ApiClient({
        baseUrl: BASE,
        fetchImpl: server.fetch,
        tokenStore: new MemoryTokenStore({ access: 'access-token' }),
    });
}

const ID = 'abc-123';
const ID2 = 'def-456';

describe('route gate — admin/backup.ts (AdminBackupApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/admin/backup/{id}',
        'GET /api/v1/admin/backup/list',
        'GET /api/v1/admin/backup/schedule',
        'POST /api/v1/admin/backup/create',
        'POST /api/v1/admin/backup/{id}/restore',
        'POST /api/v1/admin/backup/{id}/upload-s3',
        'PUT /api/v1/admin/backup/schedule',
    ];

    it('issues 7 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminBackupApi(makeClient(server));
        await driveGated(server, 'list', () => api.list());
        await driveGated(server, 'create', () => api.create({}));
        await driveGated(server, 'delete', () => api.delete(ID));
        await driveGated(server, 'restore', () => api.restore(ID));
        await driveGated(server, 'uploadToS3', () => api.uploadToS3(ID));
        await driveGated(server, 'getSchedule', () => api.getSchedule());
        await driveGated(server, 'updateSchedule', () => api.updateSchedule({ auto_backup_interval_days: 1, retention_count: 3 }));
        expectGateClean(server, EXPECTED, 7);
    });
});

describe('route gate — admin/cast.ts (AdminCastApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/airplay/devices',
        'GET /api/v1/airplay/devices/{id}/status',
        'GET /api/v1/cast/devices',
        'GET /api/v1/cast/devices/{id}/status',
        'POST /api/v1/airplay/devices/{id}/pause',
        'POST /api/v1/airplay/devices/{id}/resume',
        'POST /api/v1/airplay/devices/{id}/stop',
        'POST /api/v1/cast/devices/{id}/pause',
        'POST /api/v1/cast/devices/{id}/play',
        'POST /api/v1/cast/devices/{id}/seek',
        'POST /api/v1/cast/devices/{id}/stop',
    ];

    it('issues 11 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminCastApi(makeClient(server));
        await driveGated(server, 'listCastDevices', () => api.listCastDevices());
        await driveGated(server, 'getCastStatus', () => api.getCastStatus(ID));
        await driveGated(server, 'castPlay', () => api.castPlay(ID));
        await driveGated(server, 'castPause', () => api.castPause(ID));
        await driveGated(server, 'castStop', () => api.castStop(ID));
        await driveGated(server, 'castSeek', () => api.castSeek(ID, 30));
        await driveGated(server, 'listAirPlayDevices', () => api.listAirPlayDevices());
        await driveGated(server, 'getAirPlayStatus', () => api.getAirPlayStatus(ID));
        await driveGated(server, 'airPlayPlay', () => api.airPlayPlay(ID));
        await driveGated(server, 'airPlayPause', () => api.airPlayPause(ID));
        await driveGated(server, 'airPlayStop', () => api.airPlayStop(ID));
        expectGateClean(server, EXPECTED, 11);
    });
});

describe('route gate — admin/collections.ts (AdminCollectionsApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/collections/{id}',
        'DELETE /api/v1/collections/{id}/items/{mediaItemId}',
        'GET /api/v1/collections',
        'GET /api/v1/collections/{id}',
        'POST /api/v1/collections',
        'POST /api/v1/collections/{id}/bulk-add',
        'POST /api/v1/collections/{id}/items/{mediaItemId}',
        'POST /api/v1/collections/{id}/refresh',
        'PUT /api/v1/collections/{id}',
    ];

    it('issues 9 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminCollectionsApi(makeClient(server));
        await driveGated(server, 'list', () => api.list());
        await driveGated(server, 'get', () => api.get(ID));
        await driveGated(server, 'create', () => api.create({ name: 'Faves', library_id: 'lib-1' }));
        await driveGated(server, 'update', () => api.update(ID, { name: 'Faves 2' }));
        await driveGated(server, 'remove', () => api.remove(ID));
        await driveGated(server, 'addItem', () => api.addItem(ID, ID2));
        await driveGated(server, 'removeItem', () => api.removeItem(ID, ID2));
        await driveGated(server, 'bulkAdd', () => api.bulkAdd(ID, 'query'));
        await driveGated(server, 'refresh', () => api.refresh(ID));
        expectGateClean(server, EXPECTED, 9);
    });
});

describe('route gate — admin/dashboard.ts (AdminDashboardApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/dashboard/activity',
        'GET /api/v1/admin/dashboard/now-playing',
        'GET /api/v1/admin/dashboard/storage',
        'GET /api/v1/admin/dashboard/top-media',
        'GET /api/v1/admin/dashboard/top-users',
    ];

    it('issues 5 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminDashboardApi(makeClient(server));
        await driveGated(server, 'getNowPlaying', () => api.getNowPlaying());
        await driveGated(server, 'getTopUsers', () => api.getTopUsers(10, 7));
        await driveGated(server, 'getTopMedia', () => api.getTopMedia(10, 7));
        await driveGated(server, 'getStorage', () => api.getStorage());
        await driveGated(server, 'getActivity', () => api.getActivity(20));
        expectGateClean(server, EXPECTED, 5);
    });
});

describe('route gate — admin/dlnaServer.ts (AdminDlnaServerApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/dlna/status',
        'POST /api/v1/admin/dlna/start',
        'POST /api/v1/admin/dlna/stop',
    ];

    it('issues 3 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminDlnaServerApi(makeClient(server));
        await driveGated(server, 'getStatus', () => api.getStatus());
        await driveGated(server, 'start', () => api.start());
        await driveGated(server, 'stop', () => api.stop());
        expectGateClean(server, EXPECTED, 3);
    });
});

describe('route gate — admin/duplicates.ts (AdminDuplicatesApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/libraries/{id}/duplicates',
        'POST /api/v1/admin/media/merge',
    ];

    it('issues 2 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminDuplicatesApi(makeClient(server));
        await driveGated(server, 'listDuplicates', () => api.listDuplicates(ID));
        await driveGated(server, 'mergeDuplicates', () => api.mergeDuplicates(ID, [ID2]));
        expectGateClean(server, EXPECTED, 2);
    });
});

describe('route gate — admin/history.ts (AdminHistoryApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/users/me/history',
        'DELETE /api/v1/users/me/history/{mediaItemId}',
        'GET /api/v1/admin/watch-history',
        'GET /api/v1/users/me/recently-watched',
    ];

    it('issues 4 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminHistoryApi(makeClient(server));
        await driveGated(server, 'getRecentlyWatched', () => api.getRecentlyWatched());
        await driveGated(server, 'removeFromHistory', () => api.removeFromHistory(ID));
        await driveGated(server, 'clearHistory', () => api.clearHistory());
        await driveGated(server, 'getAllWatchHistory', () => api.getAllWatchHistory({}));
        expectGateClean(server, EXPECTED, 4);
    });
});

describe('route gate — admin/hubDashboard.ts (server-addressed half)', () => {
    it('getRecentActivity issues exactly GET /api/v1/admin/dashboard/activity', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminHubDashboardApi(makeClient(server));
        await driveGated(server, 'getRecentActivity', () => api.getRecentActivity(20));
        expectGateClean(server, ['GET /api/v1/admin/dashboard/activity'], 1);
        // getSummary's URL is hub-only — enumerated in the unserved partition.
        expect(isRegisteredRoute('GET', '/api/v1/admin/dashboard/summary')).toBe(false);
    });
});

describe('route gate — admin/integrations.ts (AdminIntegrationsApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/auth-providers',
        'GET /api/v1/admin/auth-providers/ldap/config',
        'GET /api/v1/admin/auth-providers/ldap/schema',
        'GET /api/v1/admin/auth-providers/oidc/config',
        'GET /api/v1/admin/auth-providers/oidc/schema',
        'GET /api/v1/admin/sync/status',
        'POST /api/v1/admin/auth-providers/ldap/config',
        'POST /api/v1/admin/auth-providers/ldap/test',
        'POST /api/v1/admin/auth-providers/oidc/config',
        'POST /api/v1/admin/auth-providers/{name}/disable',
        'POST /api/v1/admin/auth-providers/{name}/enable',
        'POST /api/v1/admin/sync/trash-guides',
        'PUT /api/v1/admin/sync/enable',
    ];

    it('issues 13 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminIntegrationsApi(makeClient(server));
        await driveGated(server, 'getSyncStatus', () => api.getSyncStatus());
        await driveGated(server, 'triggerSync', () => api.triggerSync());
        await driveGated(server, 'setSyncEnabled', () => api.setSyncEnabled(true));
        await driveGated(server, 'listProviders', () => api.listProviders());
        await driveGated(server, 'enableProvider', () => api.enableProvider('oidc'));
        await driveGated(server, 'disableProvider', () => api.disableProvider('oidc'));
        await driveGated(server, 'getOidcSettings', () => api.getOidcSettings());
        await driveGated(server, 'saveOidcSettings', () => api.saveOidcSettings({ provider_url: 'https://issuer.example.com', client_id: 'cid', client_secret: 'cs', scopes: 'openid' }));
        await driveGated(server, 'getOidcSchema', () => api.getOidcSchema());
        await driveGated(server, 'getLdapSettings', () => api.getLdapSettings());
        await driveGated(server, 'saveLdapSettings', () => api.saveLdapSettings({ host: 'ldap.example.com', port: 389, ssl: false, base_dn: 'dc=example', bind_dn: 'cn=admin', bind_pw: 'x', user_filter: '(objectClass=person)', admin_group: 'admins' }));
        await driveGated(server, 'testLdapConnection', () => api.testLdapConnection({ host: 'ldap.example.com', port: 389, ssl: false, base_dn: 'dc=example', bind_dn: 'cn=admin', bind_pw: 'x', user_filter: '(objectClass=person)', admin_group: 'admins' }));
        await driveGated(server, 'getLdapSchema', () => api.getLdapSchema());
        expectGateClean(server, EXPECTED, 13);
    });
});

describe('route gate — admin/libraries.ts (AdminLibrariesApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/libraries/{id}',
        'GET /api/v1/libraries',
        'GET /api/v1/libraries/{id}',
        'GET /api/v1/libraries/{id}/scan-history',
        'GET /api/v1/libraries/{id}/scan-status',
        'POST /api/v1/libraries',
        'POST /api/v1/libraries/{id}/clear-artwork',
        'POST /api/v1/libraries/{id}/clear-metadata',
        'POST /api/v1/libraries/{id}/delete-all',
        'POST /api/v1/libraries/{id}/match-metadata',
        'POST /api/v1/libraries/{id}/prune',
        'POST /api/v1/libraries/{id}/refresh-metadata',
        'POST /api/v1/libraries/{id}/regenerate-assets',
        'POST /api/v1/libraries/{id}/rescan',
        'POST /api/v1/libraries/{id}/scan',
        'PUT /api/v1/libraries/{id}',
    ];

    it('issues 16 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminLibrariesApi(makeClient(server));
        await driveGated(server, 'list', () => api.list());
        await driveGated(server, 'get', () => api.get(ID));
        await driveGated(server, 'create', () => api.create({ name: 'Movies', paths: ['/mnt/media'], type: 'movies' }));
        await driveGated(server, 'update', () => api.update(ID, { name: 'Movies 2' }));
        await driveGated(server, 'remove', () => api.remove(ID));
        await driveGated(server, 'scan', () => api.scan(ID));
        await driveGated(server, 'rescan', () => api.rescan(ID));
        await driveGated(server, 'matchMetadata', () => api.matchMetadata(ID));
        await driveGated(server, 'refreshMetadata', () => api.refreshMetadata(ID));
        await driveGated(server, 'prune', () => api.prune(ID));
        await driveGated(server, 'clearMetadata', () => api.clearMetadata(ID));
        await driveGated(server, 'clearArtwork', () => api.clearArtwork(ID));
        await driveGated(server, 'deleteAll', () => api.deleteAll(ID));
        await driveGated(server, 'regenerateAssets', () => api.regenerateAssets(ID));
        await driveGated(server, 'scanStatus', () => api.scanStatus(ID));
        await driveGated(server, 'scanHistory', () => api.scanHistory(ID, 5));
        expectGateClean(server, EXPECTED, 16);
    });
});

describe('route gate — admin/liveTv.ts (AdminLiveTvApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/admin/livetv/recordings/{id}',
        'DELETE /api/v1/admin/livetv/series-rules/{id}',
        'DELETE /api/v1/admin/livetv/tuners/{id}',
        'GET /api/v1/admin/livetv/channels',
        'GET /api/v1/admin/livetv/channels/{id}',
        'GET /api/v1/admin/livetv/guide',
        'GET /api/v1/admin/livetv/guide/programs/{id}',
        'GET /api/v1/admin/livetv/recordings',
        'GET /api/v1/admin/livetv/recordings/series/{seriesId}',
        'GET /api/v1/admin/livetv/recordings/upcoming',
        'GET /api/v1/admin/livetv/recordings/{id}',
        'GET /api/v1/admin/livetv/series-rules',
        'GET /api/v1/admin/livetv/series-rules/{id}',
        'GET /api/v1/admin/livetv/tuners',
        'GET /api/v1/admin/livetv/tuners/{id}',
        'GET /api/v1/admin/livetv/tuners/scan',
        'POST /api/v1/admin/livetv/guide/refresh',
        'POST /api/v1/admin/livetv/recordings',
        'POST /api/v1/admin/livetv/series-rules',
        'PUT /api/v1/admin/livetv/series-rules/{id}',
        'PUT /api/v1/admin/livetv/tuners/{id}',
    ];

    it('issues 21 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminLiveTvApi(makeClient(server));
        await driveGated(server, 'listTuners', () => api.listTuners());
        await driveGated(server, 'getTuner', () => api.getTuner(ID));
        await driveGated(server, 'scanTuners', () => api.scanTuners());
        await driveGated(server, 'updateTuner', () => api.updateTuner(ID, {}));
        await driveGated(server, 'deleteTuner', () => api.deleteTuner(ID));
        await driveGated(server, 'listChannels', () => api.listChannels());
        await driveGated(server, 'getChannel', () => api.getChannel(ID));
        await driveGated(server, 'listGuide', () => api.listGuide({}));
        await driveGated(server, 'getProgram', () => api.getProgram(ID));
        await driveGated(server, 'refreshGuide', () => api.refreshGuide(3));
        await driveGated(server, 'listRecordings', () => api.listRecordings({}));
        await driveGated(server, 'getRecording', () => api.getRecording(ID));
        await driveGated(server, 'createRecording', () => api.createRecording({ channel_id: 'c1' } as never));
        await driveGated(server, 'deleteRecording', () => api.deleteRecording(ID));
        await driveGated(server, 'listUpcoming', () => api.listUpcoming(10));
        await driveGated(server, 'listBySeries', () => api.listBySeries(ID));
        await driveGated(server, 'listSeriesRules', () => api.listSeriesRules());
        await driveGated(server, 'getSeriesRule', () => api.getSeriesRule(ID));
        await driveGated(server, 'createSeriesRule', () => api.createSeriesRule({} as never));
        await driveGated(server, 'updateSeriesRule', () => api.updateSeriesRule(ID, {} as never));
        await driveGated(server, 'deleteSeriesRule', () => api.deleteSeriesRule(ID));
        expectGateClean(server, EXPECTED, 21);
    });
});

describe('route gate — admin/logs.ts (AdminLogsApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/logs',
        'GET /api/v1/admin/logs/tail',
        'GET /api/v1/admin/logs/tail-all',
    ];

    it('issues 3 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminLogsApi(makeClient(server));
        await driveGated(server, 'list', () => api.list());
        await driveGated(server, 'tail', () => api.tail('server.log', 200));
        await driveGated(server, 'tailAll', () => api.tailAll(200));
        expectGateClean(server, EXPECTED, 3);
    });
});

describe('route gate — admin/maintenance.ts (AdminMaintenanceApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/maintenance/jobs',
        'GET /api/v1/admin/maintenance/jobs/{id}',
        'GET /api/v1/admin/maintenance/tasks',
        'POST /api/v1/admin/maintenance/cleanup-orphaned-stats',
        'POST /api/v1/admin/maintenance/dedupe-paths',
        'POST /api/v1/admin/maintenance/reap-scan-jobs',
        'POST /api/v1/admin/maintenance/reap-transcode-jobs',
        'POST /api/v1/admin/maintenance/storage-snapshot',
    ];

    it('issues 8 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminMaintenanceApi(makeClient(server));
        await driveGated(server, 'listTasks', () => api.listTasks());
        await driveGated(server, 'listJobs', () => api.listJobs({}));
        await driveGated(server, 'getJob', () => api.getJob(ID));
        await driveGated(server, 'storageSnapshot', () => api.storageSnapshot());
        await driveGated(server, 'dedupePaths', () => api.dedupePaths({}));
        await driveGated(server, 'reapScanJobs', () => api.reapScanJobs({}));
        await driveGated(server, 'reapTranscodeJobs', () => api.reapTranscodeJobs({}));
        await driveGated(server, 'cleanupOrphanedStats', () => api.cleanupOrphanedStats({}));
        expectGateClean(server, EXPECTED, 8);
    });
});

describe('route gate — admin/metadata-sources.ts (AdminMetadataSourcesApi)', () => {
    it('issues exactly GET /api/v1/admin/metadata/sources', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminMetadataSourcesApi(makeClient(server));
        await driveGated(server, 'listSources', () => api.listSources());
        expectGateClean(server, ['GET /api/v1/admin/metadata/sources'], 1);
    });
});

describe('route gate — admin/metrics.ts (AdminMetricsApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/metrics/connections',
        'GET /api/v1/admin/metrics/history',
        'GET /api/v1/admin/metrics/routes',
        'GET /api/v1/admin/metrics/snapshot',
    ];

    it('issues 4 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminMetricsApi(makeClient(server));
        await driveGated(server, 'getSnapshot', () => api.getSnapshot(60));
        await driveGated(server, 'getHistory', () => api.getHistory(60, 60));
        await driveGated(server, 'getConnections', () => api.getConnections(15));
        await driveGated(server, 'getRoutes', () => api.getRoutes(15, 20));
        expectGateClean(server, EXPECTED, 4);
    });
});

describe('route gate — admin/networkHealth.ts (AdminNetworkHealthApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/health/network',
        'GET /api/v1/health/relay',
    ];

    it('issues 2 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminNetworkHealthApi(makeClient(server));
        await driveGated(server, 'getRelayHealth', () => api.getRelayHealth());
        await driveGated(server, 'getNetworkHealth', () => api.getNetworkHealth());
        await driveGated(server, 'getHealthSnapshot', () => api.getHealthSnapshot());
        expectGateClean(server, EXPECTED, 4);
    });
});

describe('route gate — admin/plugins.ts (AdminPluginsApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/admin/plugins/{name}',
        'DELETE /api/v1/admin/plugins/catalog/sources',
        'GET /api/v1/admin/plugins',
        'GET /api/v1/admin/plugins/auto-update',
        'GET /api/v1/admin/plugins/catalog',
        'GET /api/v1/admin/plugins/catalog/channel',
        'GET /api/v1/admin/plugins/updates',
        'GET /api/v1/admin/plugins/{name}',
        'POST /api/v1/admin/plugins/catalog/sources',
        'POST /api/v1/admin/plugins/install',
        'POST /api/v1/admin/plugins/updates/apply',
        'POST /api/v1/admin/plugins/{name}/disable',
        'POST /api/v1/admin/plugins/{name}/enable',
        'POST /api/v1/admin/plugins/{name}/test',
        'POST /api/v1/admin/plugins/{name}/update',
        'PUT /api/v1/admin/plugins/auto-update',
        'PUT /api/v1/admin/plugins/catalog/channel',
        'PUT /api/v1/admin/plugins/{name}/settings',
    ];

    it('issues 18 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminPluginsApi(makeClient(server));
        await driveGated(server, 'list', () => api.list());
        await driveGated(server, 'get', () => api.get('anidb'));
        await driveGated(server, 'install', () => api.install('https://example.com/plugin.zip'));
        await driveGated(server, 'enable', () => api.enable('anidb'));
        await driveGated(server, 'disable', () => api.disable('anidb'));
        await driveGated(server, 'uninstall', () => api.uninstall('anidb'));
        await driveGated(server, 'catalog', () => api.catalog());
        await driveGated(server, 'addCatalogSource', () => api.addCatalogSource('https://example.com/catalog.json'));
        await driveGated(server, 'removeCatalogSource', () => api.removeCatalogSource('https://example.com/catalog.json'));
        await driveGated(server, 'checkUpdates', () => api.checkUpdates());
        await driveGated(server, 'updatePlugin', () => api.updatePlugin('anidb'));
        await driveGated(server, 'updateAll', () => api.updateAll());
        await driveGated(server, 'getAutoUpdate', () => api.getAutoUpdate());
        await driveGated(server, 'setAutoUpdate', () => api.setAutoUpdate(true));
        await driveGated(server, 'getChannel', () => api.getChannel());
        await driveGated(server, 'setChannel', () => api.setChannel('stable'));
        await driveGated(server, 'updateSettings', () => api.updateSettings('anidb', {}));
        await driveGated(server, 'testCredentials', () => api.testCredentials('anidb', {}));
        expectGateClean(server, EXPECTED, 18);
    });
});

describe('route gate — admin/remoteAccess.ts (AdminRemoteAccessApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/remote/hub/status',
        'GET /api/v1/admin/remote/portforward/candidates',
        'GET /api/v1/admin/remote/portforward/status',
        'GET /api/v1/admin/remote/relay/status',
        'GET /api/v1/admin/remote/subdomain/status',
        'POST /api/v1/admin/remote/hub/complete',
        'POST /api/v1/admin/remote/hub/heartbeat',
        'POST /api/v1/admin/remote/hub/pair',
        'POST /api/v1/admin/remote/hub/poll',
        'POST /api/v1/admin/remote/hub/unenroll',
        'POST /api/v1/admin/remote/portforward/disable',
        'POST /api/v1/admin/remote/portforward/enable',
        'POST /api/v1/admin/remote/relay/disable',
        'POST /api/v1/admin/remote/relay/enable',
        'POST /api/v1/admin/remote/relay/ping',
        'POST /api/v1/admin/remote/subdomain/claim',
        'POST /api/v1/admin/remote/subdomain/release',
    ];

    it('issues 17 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminRemoteAccessApi(makeClient(server));
        await driveGated(server, 'hubStatus', () => api.hubStatus());
        await driveGated(server, 'hubPair', () => api.hubPair('https://hub.example.com', 'Server'));
        await driveGated(server, 'hubPoll', () => api.hubPoll('claim-1', 'https://hub.example.com'));
        await driveGated(server, 'hubComplete', () => api.hubComplete('jwt', 'https://hub.example.com/jwks', 'srv-1', 'https://hub.example.com'));
        await driveGated(server, 'hubUnenroll', () => api.hubUnenroll());
        await driveGated(server, 'hubHeartbeat', () => api.hubHeartbeat());
        await driveGated(server, 'subdomainStatus', () => api.subdomainStatus());
        await driveGated(server, 'subdomainClaim', () => api.subdomainClaim());
        await driveGated(server, 'subdomainRelease', () => api.subdomainRelease());
        await driveGated(server, 'relayStatus', () => api.relayStatus());
        await driveGated(server, 'relayEnable', () => api.relayEnable());
        await driveGated(server, 'relayDisable', () => api.relayDisable());
        await driveGated(server, 'relayPing', () => api.relayPing());
        await driveGated(server, 'portForwardStatus', () => api.portForwardStatus());
        await driveGated(server, 'portForwardEnable', () => api.portForwardEnable());
        await driveGated(server, 'portForwardDisable', () => api.portForwardDisable());
        await driveGated(server, 'portForwardCandidates', () => api.portForwardCandidates());
        expectGateClean(server, EXPECTED, 17);
    });
});

describe('route gate — admin/servers.ts (AdminServersApi, server-addressed half)', () => {
    it('listServers issues exactly GET /api/v1/servers', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminServersApi(makeClient(server));
        await driveGated(server, 'listServers', () => api.listServers());
        expectGateClean(server, ['GET /api/v1/servers'], 1);
    });
});

describe('route gate — admin/services.ts (AdminServicesApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/services/lastfm/status',
        'GET /api/v1/admin/services/trakt/status',
        'POST /api/v1/admin/services/lastfm/disconnect',
        'POST /api/v1/admin/services/trakt/disconnect',
    ];

    it('issues 4 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminServicesApi(makeClient(server));
        await driveGated(server, 'getTraktStatus', () => api.getTraktStatus());
        await driveGated(server, 'disconnectTrakt', () => api.disconnectTrakt());
        await driveGated(server, 'getLastfmStatus', () => api.getLastfmStatus());
        await driveGated(server, 'disconnectLastfm', () => api.disconnectLastfm());
        expectGateClean(server, EXPECTED, 4);
        // The OAuth navigation targets are browser redirects, not client
        // requests — but they ARE server routes the client relies on, so pin
        // them tuple-exact by literal.
        expect(isRegisteredRoute('GET', '/api/v1/oauth/trakt')).toBe(true);
        expect(isRegisteredRoute('GET', '/api/v1/oauth/lastfm')).toBe(true);
    });
});

describe('route gate — admin/settings.ts (AdminSettingsApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/settings',
        'POST /api/v1/admin/restart',
        'PUT /api/v1/admin/settings',
    ];

    it('issues 3 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminSettingsApi(makeClient(server));
        await driveGated(server, 'get', () => api.get());
        await driveGated(server, 'save', () => api.save({}));
        await driveGated(server, 'restartServer', () => api.restartServer());
        expectGateClean(server, EXPECTED, 3);
    });
});

describe('route gate — admin/syncPlay.ts (AdminSyncPlayApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/syncplay/groups',
        'GET /api/v1/syncplay/groups/{id}',
        'POST /api/v1/syncplay/groups',
        'POST /api/v1/syncplay/groups/{id}/join',
        'POST /api/v1/syncplay/groups/{id}/leave',
    ];

    it('issues 5 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminSyncPlayApi(makeClient(server));
        await driveGated(server, 'listGroups', () => api.listGroups());
        await driveGated(server, 'createGroup', () => api.createGroup({ name: 'G' }));
        await driveGated(server, 'getGroup', () => api.getGroup(ID));
        await driveGated(server, 'joinGroup', () => api.joinGroup(ID));
        await driveGated(server, 'leaveGroup', () => api.leaveGroup(ID));
        expectGateClean(server, EXPECTED, 5);
    });
});

describe('route gate — admin/transcoding.ts (AdminTranscodingApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'GET /api/v1/admin/transcoding/accelerators',
        'GET /api/v1/admin/transcoding/tone-mapping',
        'PUT /api/v1/admin/transcoding/tone-mapping',
    ];

    it('issues 3 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminTranscodingApi(makeClient(server));
        await driveGated(server, 'getAccelerators', () => api.getAccelerators());
        await driveGated(server, 'getToneMapping', () => api.getToneMapping());
        await driveGated(server, 'setToneMapping', () => api.setToneMapping({ prefer_hdr_output: false, tone_map_mode: 'zscale' }));
        expectGateClean(server, EXPECTED, 3);
        // `setPreferredAccelerator` PUTs /api/v1/admin/transcoding/accelerators —
        // a route the server does not register (no setter exists server-side);
        // enumerated in the unserved partition below, W18 follow-up.
        expect(isRegisteredRoute('PUT', '/api/v1/admin/transcoding/accelerators')).toBe(false);
    });
});

describe('route gate — admin/updates.ts (AdminUpdatesApi)', () => {
    it('issues exactly GET /api/v1/admin/updates/status', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminUpdatesApi(makeClient(server));
        await driveGated(server, 'getStatus', () => api.getStatus());
        expectGateClean(server, ['GET /api/v1/admin/updates/status'], 1);
    });
});

describe('route gate — admin/users.ts (AdminUsersApi, server-addressed half)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/admin/profiles/{id}',
        'DELETE /api/v1/admin/profiles/{id}/pin',
        'DELETE /api/v1/admin/profiles/{profileId}/schedules/{scheduleId}',
        'DELETE /api/v1/admin/profiles/{profileId}/tags/{tagId}',
        'DELETE /api/v1/admin/users/{id}',
        'GET /api/v1/admin/profiles/{id}',
        'GET /api/v1/admin/profiles/{profileId}/schedules',
        'GET /api/v1/admin/profiles/{profileId}/stream-limits',
        'GET /api/v1/admin/profiles/{profileId}/tags',
        'GET /api/v1/admin/users',
        'GET /api/v1/admin/users/{id}',
        'GET /api/v1/admin/users/{userId}/profiles',
        'POST /api/v1/admin/profiles/{id}/pin',
        'POST /api/v1/admin/profiles/{profileId}/schedules',
        'POST /api/v1/admin/profiles/{profileId}/tags',
        'POST /api/v1/admin/users',
        'POST /api/v1/admin/users/{id}/approve',
        'POST /api/v1/admin/users/{id}/disable',
        'POST /api/v1/admin/users/{id}/reject',
        'POST /api/v1/admin/users/{id}/reset-password',
        'POST /api/v1/admin/users/{id}/set-admin',
        'POST /api/v1/admin/users/{userId}/profiles',
        'PUT /api/v1/admin/profiles/{id}',
        'PUT /api/v1/admin/profiles/{profileId}/schedules/{scheduleId}',
        'PUT /api/v1/admin/profiles/{profileId}/stream-limits',
        'PUT /api/v1/admin/users/{id}',
    ];

    it('issues 26 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminUsersApi(makeClient(server));
        await driveGated(server, 'list', () => api.list({}));
        await driveGated(server, 'approve', () => api.approve(1));
        await driveGated(server, 'disable', () => api.disable(1));
        await driveGated(server, 'reject', () => api.reject(1));
        await driveGated(server, 'get', () => api.get(1));
        await driveGated(server, 'create', () => api.create({ username: 'u', email: 'u@x.io', password: 'p' }));
        await driveGated(server, 'update', () => api.update(1, { username: 'u2' }));
        await driveGated(server, 'remove', () => api.remove(1));
        await driveGated(server, 'setAdmin', () => api.setAdmin(1, true));
        await driveGated(server, 'resetPassword', () => api.resetPassword(1));
        await driveGated(server, 'listProfiles', () => api.listProfiles(1));
        await driveGated(server, 'createProfile', () => api.createProfile(1, { name: 'Kids', rating: 3 }));
        await driveGated(server, 'getProfile', () => api.getProfile(7));
        await driveGated(server, 'updateProfile', () => api.updateProfile(7, { name: 'Kids 2', rating: 3 }));
        await driveGated(server, 'removeProfile', () => api.removeProfile(7));
        await driveGated(server, 'setPin', () => api.setPin(7, '1234'));
        await driveGated(server, 'clearPin', () => api.clearPin(7));
        await driveGated(server, 'profileSchedules', () => api.profileSchedules(7));
        await driveGated(server, 'createProfileSchedule', () => api.createProfileSchedule(7, 'Evenings', '18:00', '22:00', ['mo'], true));
        await driveGated(server, 'updateProfileSchedule', () => api.updateProfileSchedule(7, 11, 'Evenings', '18:00', '22:00', ['mo'], true));
        await driveGated(server, 'deleteProfileSchedule', () => api.deleteProfileSchedule(7, 11));
        await driveGated(server, 'profileTags', () => api.profileTags(7));
        await driveGated(server, 'addProfileTag', () => api.addProfileTag(7, 'kids', 'blocked'));
        await driveGated(server, 'deleteProfileTag', () => api.deleteProfileTag(7, 3));
        await driveGated(server, 'profileStreamLimits', () => api.profileStreamLimits(7));
        await driveGated(server, 'updateProfileStreamLimits', () => api.updateProfileStreamLimits(7, 2, 5000));
        expectGateClean(server, EXPECTED, 26);
    });
});

describe('route gate — admin/webhooks.ts (AdminWebhooksApi)', () => {
    const EXPECTED: ReadonlyArray<string> = [
        'DELETE /api/v1/admin/webhooks/{id}',
        'GET /api/v1/admin/webhooks',
        'POST /api/v1/admin/webhooks',
        'POST /api/v1/admin/webhooks/{id}/test',
        'PUT /api/v1/admin/webhooks/{id}',
    ];

    it('issues 5 distinct urls, every one a registered server route', async () => {
        const server = makeRouteGateServer(BASE);
        const api = new AdminWebhooksApi(makeClient(server));
        await driveGated(server, 'list', () => api.list());
        await driveGated(server, 'create', () => api.create({ url: 'https://x.io/hook', name: 'hook', secret: 's', events: [] }));
        await driveGated(server, 'update', () => api.update(ID, { url: 'https://y.io/hook', name: 'hook', secret: 's', events: [] }));
        await driveGated(server, 'remove', () => api.remove(ID));
        await driveGated(server, 'test', () => api.test(ID));
        expectGateClean(server, EXPECTED, 5);
    });
});

// ── hub-addressed + known-unserved admin surfaces — enumerated, W18 ───────────

describe('route gate — hub-addressed + unserved admin URLs (enumerated; W18 follow-up)', () => {
    /**
     * URLs minted by admin modules that the phlix-server does NOT serve, in two
     * flavours:
     *
     * 1. HUB-addressed — the HUB's HTTP surface, not the media server's:
     *    `users.ts` relay bandwidth trio (hub-only per the module docblock,
     *    S41/S42/S43), `servers.ts` fleet detail, `hubDashboard.ts` summary.
     *    Their gate is the HUB's route contract, a named W18 follow-up.
     * 2. Server-addressed but UNREGISTERED — `transcoding.ts`
     *    `setPreferredAccelerator` PUTs a route the server never registered (no
     *    setter exists server-side), and `webhooks.ts`'s `AdminWebhookLogsApi`
     *    targets delivery-log routes the server does not implement (documented
     *    in `src/pages/admin/helpLinks.ts`: the page is routed by nothing and
     *    all three calls hit unimplemented endpoints). Both are pinned here so
     *    the S280 defect stays enumerated and loud — the moment the server
     *    gains the routes, these assertions red and the methods move into the
     *    gated set above.
     */
    const UNSERVED_URLS: ReadonlyArray<string> = [
        // hub-addressed
        'GET /api/v1/admin/users/{id}/bandwidth',
        'PUT /api/v1/admin/users/{id}/throttle',
        'PUT /api/v1/admin/users/{id}/quota',
        'GET /api/v1/servers/{id}',
        'GET /api/v1/admin/dashboard/summary',
        // server-addressed but unregistered (W18: server gains the routes)
        'PUT /api/v1/admin/transcoding/accelerators',
        'GET /api/v1/admin/webhooks/logs',
        'POST /api/v1/admin/webhooks/logs/{id}/retry',
        'DELETE /api/v1/admin/webhooks/logs/{id}',
    ];

    it('enumerates every unserved URL and confirms none is a server route', () => {
        for (const key of UNSERVED_URLS) {
            const [method, path] = key.split(' ');
            expect(isRegisteredRoute(method!, path!)).toBe(false);
        }
    });
});