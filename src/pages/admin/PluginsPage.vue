<!--
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
-->

<script setup lang="ts">
/**
 * Admin PluginsPage — browse a plugin **catalog** and run the full lifecycle
 * (install / enable / disable / uninstall / configure) for server plugins.
 *
 * The page seeds itself from one or more catalog repositories (`plugins.json`,
 * default `detain/phlix-plugins`), fetched server-side via
 * `GET /plugins/catalog`. Each catalog entry renders as a card whose actions
 * depend on whether it is already installed: not-installed → **Install** (by
 * the catalog `repo` URL); installed → an enable/disable **Switch** plus
 * **Configure** and **Uninstall**. A sources bar lists every catalog and lets
 * the admin add another catalog URL or remove an extra one (the default cannot
 * be removed). A single-repo-URL **Install from URL** path is still available
 * for plugins not in any catalog, and any such manually-installed plugins are
 * listed in an "Other installed plugins" section so they remain manageable.
 *
 * Configure opens a Modal that GETs the plugin detail and renders a form from
 * the manifest `settings_schema` (one control per key by type). Secret fields
 * start EMPTY — never prefilled with the `***` mask — and are sent only when the
 * admin types a new value, or explicitly clicks Remove to clear the stored one.
 * A secret's Configured / Not set / Unknown cue is driven entirely by the
 * server's `secret_status`; "unknown" (an older server that omits the map) is
 * reported honestly rather than as "not set". Only keys the admin actually
 * changed are sent, so an untouched field is never rewritten. Per-field
 * validation errors from a `400 plugin.settings.validation_failed` render under
 * the offending field, under a banner pointing at them. Plugins that complete an
 * OAuth handshake also get their `redirect_url` rendered with a copy button —
 * the provider's app configuration needs that exact string and this is the only
 * surface that reveals it. Every mutation refetches both the catalog and the
 * installed list. Errors surface as toasts.
 */
import { ref, computed, onMounted, inject, type ComputedRef } from 'vue';
import { ApiClient } from '../../api/client';
import { LocalStorageTokenStore } from '../../api/tokenStore';
import {
  AdminPluginsApi,
  pluginErrorCode,
  pluginValidationErrors,
  type Plugin,
  type PluginDetail,
  type PluginSettingDescriptor,
  type PluginSecretStatus,
  type CatalogResponse,
  type CatalogPlugin,
  type PluginUpdate,
} from '../../api/admin/plugins';
import { useToastStore } from '../../stores/useToastStore';
import { errMessage } from '../../api/errors';
import Icon from '../../components/Icon.vue';
import Badge from '../../components/ui/Badge.vue';
import PageHint from '../../components/ui/PageHint.vue';
import Button from '../../components/ui/Button.vue';
import Modal from '../../components/ui/Modal.vue';
import Switch from '../../components/ui/Switch.vue';
import Skeleton from '../../components/ui/Skeleton.vue';
import EmptyState from '../../components/ui/EmptyState.vue';
import HelpText from '../../components/ui/HelpText.vue';

const props = defineProps<{
  /** Inject a pre-built API client for tests; otherwise one is built from `apiBase`. */
  client?: ApiClient;
}>();

const injectedApiBase = inject<string | ComputedRef<string> | undefined>('apiBase', '');
const apiBase = computed(() =>
  typeof injectedApiBase === 'string' ? injectedApiBase : injectedApiBase?.value ?? '',
);
const api = new AdminPluginsApi(
  props.client ?? new ApiClient({ baseUrl: apiBase.value, tokenStore: new LocalStorageTokenStore() }),
);
const toasts = useToastStore();

// ── Installed-plugin list state ──────────────────────────────────────────────
const plugins = ref<Plugin[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function loadPlugins(): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    plugins.value = await api.list();
  } catch (e) {
    error.value = errMessage(e, 'Failed to load plugins.');
    toasts.error(error.value);
  } finally {
    loading.value = false;
  }
}

// ── Catalog state ────────────────────────────────────────────────────────────
const catalog = ref<CatalogResponse>({ default_source: '', sources: [], catalogs: [], errors: [] });
const catalogLoading = ref(true);

async function loadCatalog(): Promise<void> {
  catalogLoading.value = true;
  try {
    catalog.value = await api.catalog();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load the plugin catalog.'));
  } finally {
    catalogLoading.value = false;
  }
}

/** Refresh the catalog and the installed list together after a mutation. */
async function refreshAll(): Promise<void> {
  await Promise.all([loadPlugins(), loadCatalog()]);
}

/**
 * Every catalog entry, flattened across sources and de-duplicated by manifest
 * name (first occurrence wins) so a plugin listed in two catalogs shows once.
 */
const catalogPlugins = computed<CatalogPlugin[]>(() => {
  const seen = new Set<string>();
  const out: CatalogPlugin[] = [];
  for (const c of catalog.value.catalogs) {
    for (const p of c.plugins) {
      if (seen.has(p.name)) continue;
      seen.add(p.name);
      out.push(p);
    }
  }
  return out;
});

/** Names present in the catalog (to separate catalog plugins from orphans). */
const catalogNames = computed(() => new Set(catalogPlugins.value.map((p) => p.name)));

/** Installed plugins that are NOT in any catalog — still manageable below. */
const orphanPlugins = computed(() => plugins.value.filter((p) => !catalogNames.value.has(p.name)));

/** Compact label for a source URL, e.g. `detain/phlix-plugins`. */
function sourceLabel(url: string): string {
  const m = url.match(/github\.com[/:]([^/]+\/[^/]+?)(?:\.git)?\/?$/i);
  if (m) return m[1];
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

/** Adapt a catalog entry to the minimal {@link Plugin} the lifecycle handlers need. */
function asPlugin(p: CatalogPlugin): Plugin {
  return { name: p.name, version: '', type: p.type, enabled: p.enabled };
}

// ── Install (single repo URL) modal ──────────────────────────────────────────
const installOpen = ref(false);
const installUrl = ref('');
const installSubmitting = ref(false);

/**
 * Map a server install error `code` to a clearer message; fall back to the raw
 * error text. Codes are the real ones emitted by `PluginAdminController::install`:
 * `plugin.url.required`, `plugin.url.invalid_scheme`, `plugin.install.failed`.
 */
function installErrorMessage(e: unknown): string {
  const code = pluginErrorCode(e);
  switch (code) {
    case 'plugin.url.required':
      return 'A plugin URL is required.';
    case 'plugin.url.invalid_scheme':
      return 'That does not look like a valid plugin URL (use https://…).';
    case 'plugin.install.failed':
      // Surface the server's actual reason (e.g. "Cannot create plugins base
      // directory … re-running install.sh --update fixes it") rather than a
      // generic download message — the real cause is often a filesystem /
      // permissions issue the operator needs to see verbatim.
      return errMessage(e, 'Install failed — the plugin could not be downloaded or read.');
    default:
      return errMessage(e, 'Failed to install plugin.');
  }
}

function openInstall(): void {
  installUrl.value = '';
  installOpen.value = true;
}

function closeInstall(): void {
  installOpen.value = false;
  installUrl.value = '';
}

/** The last install failure, shown as a persistent banner (toasts are fleeting;
 *  a filesystem/permissions error needs to stay on screen so the operator can
 *  read and act on it). Cleared when an install starts or succeeds. */
const installError = ref<string | null>(null);

/** Record an install failure on both the persistent banner and a toast. */
function reportInstallError(e: unknown): void {
  const msg = installErrorMessage(e);
  installError.value = msg;
  toasts.error(msg);
}

async function submitInstall(): Promise<void> {
  const url = installUrl.value.trim();
  if (!url) {
    toasts.error('A plugin URL is required.');
    return;
  }
  installSubmitting.value = true;
  installError.value = null;
  try {
    await api.install(url);
    toasts.success('Plugin installed.');
    closeInstall();
    await refreshAll();
  } catch (e) {
    reportInstallError(e);
  } finally {
    installSubmitting.value = false;
  }
}

// ── Install from catalog ─────────────────────────────────────────────────────
/** Repo URL of the catalog plugin whose install is currently in flight. */
const installingRepo = ref<string | null>(null);

async function installFromCatalog(p: CatalogPlugin): Promise<void> {
  if (installingRepo.value !== null) return;
  installingRepo.value = p.repo;
  installError.value = null;
  try {
    await api.install(p.repo);
    toasts.success(`${p.title} installed.`);
    await refreshAll();
  } catch (e) {
    reportInstallError(e);
  } finally {
    installingRepo.value = null;
  }
}

// ── Catalog sources management ───────────────────────────────────────────────
const addSourceOpen = ref(false);
const newSourceUrl = ref('');
const addingSource = ref(false);
/** Source URL whose removal is in flight. */
const removingSource = ref<string | null>(null);

function openAddSource(): void {
  newSourceUrl.value = '';
  addSourceOpen.value = true;
}

function closeAddSource(): void {
  addSourceOpen.value = false;
  newSourceUrl.value = '';
}

async function submitAddSource(): Promise<void> {
  const url = newSourceUrl.value.trim();
  if (!url) {
    toasts.error('A catalog URL is required.');
    return;
  }
  addingSource.value = true;
  try {
    await api.addCatalogSource(url);
    toasts.success('Catalog added.');
    closeAddSource();
    await loadCatalog();
  } catch (e) {
    const code = pluginErrorCode(e);
    toasts.error(
      code === 'plugin.catalog.url.invalid'
        ? 'That catalog URL is not valid (use an http(s):// URL).'
        : errMessage(e, 'Failed to add catalog.'),
    );
  } finally {
    addingSource.value = false;
  }
}

async function removeCatalogSource(url: string): Promise<void> {
  if (removingSource.value !== null) return;
  removingSource.value = url;
  try {
    await api.removeCatalogSource(url);
    toasts.success('Catalog removed.');
    await loadCatalog();
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to remove catalog.'));
  } finally {
    removingSource.value = null;
  }
}

// ── Updates ──────────────────────────────────────────────────────────────────
/** Per-plugin update status keyed by manifest name (populated by `checkUpdates`). */
const updatesByName = ref<Record<string, PluginUpdate>>({});
/** True while the manual update check is in flight (drives the button spinner). */
const checkingUpdates = ref(false);
/** True while "Update all" is in flight. */
const updatingAll = ref(false);
/** Name of the plugin whose single-plugin update is currently in flight. */
const updatingName = ref<string | null>(null);
/** The auto-update toggle (loaded on mount, persisted on change). */
const autoUpdate = ref(false);

/** Count of installed plugins with an update available. */
const updateCount = computed(
  () => Object.values(updatesByName.value).filter((u) => u.update_available).length,
);

/** The update status for a plugin (only when an update is actually available). */
function updateFor(name: string): PluginUpdate | null {
  const u = updatesByName.value[name];
  return u && u.update_available ? u : null;
}

/** Index the update rows by name, keeping only the actionable (update-available) ones. */
function indexUpdates(updates: PluginUpdate[]): void {
  const map: Record<string, PluginUpdate> = {};
  for (const u of updates) {
    if (u && typeof u.name === 'string' && u.update_available) map[u.name] = u;
  }
  updatesByName.value = map;
}

/** Drop a single plugin from the available-updates map (after it updated). */
function clearUpdate(name: string): void {
  if (name in updatesByName.value) {
    const next = { ...updatesByName.value };
    delete next[name];
    updatesByName.value = next;
  }
}

/** Manually run the update check and summarise the result as a toast. */
async function checkForUpdates(): Promise<void> {
  if (checkingUpdates.value) return;
  checkingUpdates.value = true;
  try {
    const res = await api.checkUpdates();
    indexUpdates(res.updates);
    autoUpdate.value = res.auto_update;
    const n = updateCount.value;
    toasts.success(
      n > 0
        ? `${n} update${n === 1 ? '' : 's'} available.`
        : 'All plugins are up to date.',
    );
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to check for updates.'));
  } finally {
    checkingUpdates.value = false;
  }
}

/**
 * Map a server update error `code` to a clearer message; fall back to the raw
 * error text. Codes are the ones emitted by the update endpoint:
 * `plugin.update.no_source`, `plugin.update.failed`.
 */
function updateErrorMessage(e: unknown): string {
  const code = pluginErrorCode(e);
  switch (code) {
    case 'plugin.update.no_source':
      return 'This plugin has no update source — reinstall it from a URL to update.';
    case 'plugin.update.failed':
      return errMessage(e, 'Update failed — the new version could not be downloaded or read.');
    default:
      return errMessage(e, 'Failed to update plugin.');
  }
}

/** Update a single plugin, then refetch and drop it from the available list. */
async function updatePlugin(plugin: Plugin): Promise<void> {
  if (updatingName.value !== null) return;
  updatingName.value = plugin.name;
  opError.value = null;
  try {
    await api.updatePlugin(plugin.name);
    toasts.success(`${plugin.name} updated.`);
    clearUpdate(plugin.name);
    await refreshAll();
  } catch (e) {
    opError.value = { title: `Couldn't update ${plugin.name}`, message: updateErrorMessage(e) };
    toasts.error(updateErrorMessage(e));
  } finally {
    updatingName.value = null;
  }
}

/** Apply every available update, summarise the outcome, then refetch + re-check. */
async function updateAll(): Promise<void> {
  if (updatingAll.value) return;
  updatingAll.value = true;
  try {
    const res = await api.updateAll();
    if (res.failed.length > 0) {
      toasts.error(
        `${res.updated.length} updated, ${res.failed.length} failed.`,
      );
    } else {
      toasts.success(`${res.updated.length} plugin${res.updated.length === 1 ? '' : 's'} updated.`);
    }
    await refreshAll();
    const check = await api.checkUpdates();
    indexUpdates(check.updates);
    autoUpdate.value = check.auto_update;
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to apply updates.'));
  } finally {
    updatingAll.value = false;
  }
}

/** Persist the auto-update toggle; revert the optimistic flip on failure. */
async function onToggleAutoUpdate(value: boolean): Promise<void> {
  const previous = autoUpdate.value;
  autoUpdate.value = value;
  try {
    autoUpdate.value = await api.setAutoUpdate(value);
    toasts.success(value ? 'Auto-update enabled.' : 'Auto-update disabled.');
  } catch (e) {
    autoUpdate.value = previous;
    toasts.error(errMessage(e, 'Failed to change auto-update.'));
  }
}

// ── Lifecycle-action error banner ────────────────────────────────────────────
/**
 * The last enable/disable/update/uninstall failure, shown as a persistent
 * banner. A plugin that refuses to enable reports a real reason (missing API
 * key, an onEnable() error, an unresolvable entry class) that a fleeting toast
 * is too easy to miss — it needs to stay on screen so the operator can read and
 * act on it. `title` names what failed. Cleared when a new action starts.
 */
const opError = ref<{ title: string; message: string } | null>(null);

/** Record a lifecycle-action failure on both the persistent banner and a toast. */
function reportOpError(title: string, e: unknown, fallback: string): void {
  const message = errMessage(e, fallback);
  opError.value = { title, message };
  toasts.error(message);
}

// ── Enable / disable ─────────────────────────────────────────────────────────
/** Name of the plugin whose enable/disable request + refetch is currently in flight. */
const togglingName = ref<string | null>(null);

async function toggleEnabled(plugin: Plugin, enabled: boolean): Promise<void> {
  // Ignore re-entrant toggles (rapid double-click) while one is in flight.
  if (togglingName.value !== null) return;
  togglingName.value = plugin.name;
  opError.value = null;
  try {
    if (enabled) {
      await api.enable(plugin.name);
      toasts.success(`${plugin.name} enabled.`);
    } else {
      await api.disable(plugin.name);
      toasts.success(`${plugin.name} disabled.`);
    }
    await refreshAll();
  } catch (e) {
    // The switch stays bound to the server's real enabled state (it never
    // flipped), so on failure it simply shows "off" again — the banner is what
    // tells the operator WHY. Enable errors carry the server's message
    // verbatim (e.g. "OMDb API key not configured", "entry class … could not
    // be resolved"), so surface it rather than a generic line.
    reportOpError(
      enabled ? `Couldn't enable ${plugin.name}` : `Couldn't disable ${plugin.name}`,
      e,
      'Failed to update plugin.',
    );
  } finally {
    togglingName.value = null;
  }
}

// ── Uninstall confirm ────────────────────────────────────────────────────────
const uninstalling = ref<Plugin | null>(null);

async function confirmUninstall(): Promise<void> {
  const target = uninstalling.value;
  if (!target) return;
  try {
    await api.uninstall(target.name);
    toasts.success(`${target.name} uninstalled.`);
    uninstalling.value = null;
    await refreshAll();
  } catch (e) {
    reportOpError(`Couldn't uninstall ${target.name}`, e, 'Failed to uninstall plugin.');
    uninstalling.value = null;
  }
}

// ── Configure modal ──────────────────────────────────────────────────────────
const configuring = ref<Plugin | null>(null);
const detail = ref<PluginDetail | null>(null);
const detailLoading = ref(false);
const configSubmitting = ref(false);
/** Current form values, keyed by setting key. */
const formValues = ref<Record<string, unknown>>({});
/** The pristine values the form was seeded with (to detect what the admin changed). */
const pristineValues = ref<Record<string, unknown>>({});
/** Per-field validation errors from the last save attempt. */
const fieldErrors = ref<Record<string, string>>({});
/**
 * Modal-level save error. A toast is too fleeting to pair with per-field errors
 * rendered further down a long form, so a persistent banner points at them.
 */
const configError = ref<string | null>(null);
/**
 * Polite announcement for the Redirect-URL copy button. Clipboard success is
 * otherwise invisible to a screen-reader user (the toast is not in this modal's
 * live region), so the outcome is mirrored into a visually-hidden status node.
 */
const copyAnnouncement = ref('');
/**
 * Secret keys the admin has explicitly armed for removal.
 *
 * Secret inputs start blank and a blank field means "keep the stored value", so
 * clearing the box cannot express "delete this". This map is the explicit
 * opt-in: an armed key sends `''`, which the server persists as an empty secret
 * (it only skips a secret whose value is the mask sentinel).
 */
const secretRemoval = ref<Record<string, boolean>>({});

const configTitle = computed(() =>
  configuring.value ? `Configure — ${configuring.value.name}` : 'Configure plugin',
);

/** Ordered [key, descriptor] entries of the open plugin's settings schema. */
const schemaEntries = computed<Array<[string, PluginSettingDescriptor]>>(() =>
  detail.value ? Object.entries(detail.value.settings_schema) : [],
);

const hasSchema = computed(() => schemaEntries.value.length > 0);

/**
 * The plugin's OAuth redirect/callback URL, when the server reports one.
 *
 * `serializeDetail()` emits `redirect_url` for plugins that complete an OAuth
 * handshake (Trakt, Last.fm, …). The provider's own application settings need
 * that exact URL pasted in, and this modal is the only place an admin can read
 * it — so it renders verbatim with a copy affordance rather than being left for
 * the admin to reconstruct by hand.
 */
const redirectUrl = computed(() => detail.value?.redirect_url ?? '');

/** Copy the redirect URL, announcing the outcome politely as well as by toast. */
async function copyRedirectUrl(): Promise<void> {
  const url = redirectUrl.value;
  if (!url) return;
  try {
    await navigator.clipboard.writeText(url);
    copyAnnouncement.value = 'Redirect URL copied to clipboard.';
    toasts.success('Redirect URL copied to clipboard.');
  } catch {
    copyAnnouncement.value = 'Could not copy the redirect URL. Copy it manually instead.';
    toasts.error('Failed to copy the redirect URL.');
  }
}

/** `id` of the status line describing a secret field, for `aria-describedby`. */
function secretStatusId(key: string): string {
  return `plugin-secret-status-${key}`;
}

/** True for the structured types whose control is a text box holding JSON. */
function isJsonType(descriptor: PluginSettingDescriptor): boolean {
  return descriptor.type === 'array' || descriptor.type === 'object';
}

/** The HTML input type for a non-secret descriptor. */
function inputType(descriptor: PluginSettingDescriptor): 'number' | 'text' {
  return descriptor.type === 'int' ||
    descriptor.type === 'integer' ||
    descriptor.type === 'number' ||
    descriptor.type === 'float'
    ? 'number'
    : 'text';
}

function isBool(descriptor: PluginSettingDescriptor): boolean {
  return descriptor.type === 'bool' || descriptor.type === 'boolean';
}

/** Coerce a stored/masked value into the form's initial control value. */
function seedValue(descriptor: PluginSettingDescriptor, stored: unknown): unknown {
  if (isBool(descriptor)) {
    return stored === true || stored === 1 || stored === '1' || stored === 'true';
  }
  if (descriptor.secret) {
    // Secret inputs ALWAYS start empty — we never prefill them with the masked
    // value (nor echo it back). Whether a secret is already stored is shown by
    // the `secret_status` line beside the field; leaving the box blank keeps the
    // stored value, typing replaces it. This removes the old `***`-round-trip
    // ambiguity where a set and an unset secret looked identical.
    return '';
  }
  if (stored === undefined || stored === null) {
    const fallback = descriptor.default !== undefined ? descriptor.default : '';
    return isJsonType(descriptor) && fallback !== '' ? JSON.stringify(fallback) : fallback;
  }
  // `array` / `object` have no dedicated control — they edit as JSON in a text
  // box, so the structured value is serialised on the way in and parsed on the
  // way out. Rendering the raw value would stringify it as `[object Object]`.
  if (isJsonType(descriptor) && typeof stored !== 'string') {
    return JSON.stringify(stored);
  }
  return stored;
}

/** The stored secret's set/length status for a field (null for non-secret / unknown). */
function secretStatusFor(key: string): PluginSecretStatus | null {
  const status = detail.value?.secret_status?.[key];
  return status ?? null;
}

/** A row of bullet dots ~matching a stored secret's length (capped so it never overflows). */
function secretDots(length: number): string {
  return '•'.repeat(Math.max(1, Math.min(length, 32)));
}

/** True while `key` is armed to have its stored secret cleared on the next save. */
function isRemovingSecret(key: string): boolean {
  return secretRemoval.value[key] === true;
}

/**
 * Whether to offer a Remove control for a secret field.
 *
 * Offered unless the server positively reports the secret as unset — there is
 * nothing to remove then. A server too old to send `secret_status` reports
 * `null` (unknown), where the control MUST stay available: that admin may well
 * have a stored value and would otherwise have no way to clear it.
 */
function canRemoveSecret(key: string, descriptor: PluginSettingDescriptor): boolean {
  return descriptor.secret && secretStatusFor(key)?.set !== false;
}

/**
 * Arm a secret for removal. Also drops any half-typed replacement, so the field
 * cannot both "be removed" and "carry a new value" — the two intents are
 * mutually exclusive and the last one clicked wins.
 */
function requestSecretRemoval(key: string): void {
  secretRemoval.value[key] = true;
  formValues.value[key] = '';
}

/** Disarm a pending removal, returning the field to "leave the stored value alone". */
function cancelSecretRemoval(key: string): void {
  delete secretRemoval.value[key];
}

/** Human hint for a field's declared default, or null when there is none / it is empty. */
function defaultHint(descriptor: PluginSettingDescriptor): string | null {
  if (descriptor.secret) return null; // never surface a secret default
  if (!('default' in descriptor)) return null;
  const d = descriptor.default;
  if (d === null || d === undefined || d === '') return null;
  if (typeof d === 'boolean') return d ? 'on' : 'off';
  return String(d);
}

/** Anchor text for a field's help link. */
function linkText(descriptor: PluginSettingDescriptor): string {
  return descriptor.link_text && descriptor.link_text.trim() !== ''
    ? descriptor.link_text
    : 'Where to get this';
}

/**
 * A field's help links for {@link HelpText}. `link_text` is independently
 * optional — the manifest and the server's field-help overlay each supply either
 * key on its own — so a link with no anchor text must still render (under
 * {@link linkText}'s default) rather than being silently dropped.
 */
function helpLinks(descriptor: PluginSettingDescriptor): Array<{ text: string; url: string }> | undefined {
  if (!descriptor.link) return undefined;
  return [{ text: linkText(descriptor), url: descriptor.link }];
}

async function openConfigure(plugin: Plugin): Promise<void> {
  configuring.value = plugin;
  detail.value = null;
  formValues.value = {};
  pristineValues.value = {};
  fieldErrors.value = {};
  configError.value = null;
  copyAnnouncement.value = '';
  secretRemoval.value = {};
  detailLoading.value = true;
  try {
    const d = await api.get(plugin.name);
    detail.value = d;
    const values: Record<string, unknown> = {};
    for (const [key, descriptor] of Object.entries(d.settings_schema)) {
      values[key] = seedValue(descriptor, d.settings[key]);
    }
    formValues.value = values;
    pristineValues.value = { ...values };
  } catch (e) {
    toasts.error(errMessage(e, 'Failed to load plugin settings.'));
    configuring.value = null;
  } finally {
    detailLoading.value = false;
  }
}

function closeConfigure(): void {
  configuring.value = null;
  detail.value = null;
  formValues.value = {};
  pristineValues.value = {};
  fieldErrors.value = {};
  configError.value = null;
  copyAnnouncement.value = '';
  secretRemoval.value = {};
}

/**
 * Build the settings payload: every key whose value changed from its pristine
 * seed. Secret fields always start EMPTY, so a blank secret is left out — the
 * server preserves the stored value — and a secret is only sent when the admin
 * actually types one (which then replaces the stored value). Booleans/ints are
 * coerced to their canonical JS type so the server's type validation passes.
 */
function buildChangedSettings(): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!detail.value) return out;
  for (const [key, descriptor] of Object.entries(detail.value.settings_schema)) {
    const current = formValues.value[key];
    if (descriptor.secret) {
      // An explicit removal wins over everything: `''` is what clears it.
      if (isRemovingSecret(key)) {
        out[key] = '';
        continue;
      }
      // Blank → keep the stored secret; only a typed value is sent.
      if (current === '' || current === null || current === undefined) continue;
      out[key] = current;
      continue;
    }
    const pristine = pristineValues.value[key];
    if (current === pristine) continue; // untouched
    out[key] = coerceOutgoing(descriptor, current);
  }
  return out;
}

/**
 * Coerce one changed control value into the type the server validates against.
 *
 * A cleared optional field becomes `null` rather than `''`: an empty string is a
 * value, and only `null` expresses "unset" to the server. Booleans are already
 * real booleans (the `Switch` emits one); numbers are parsed; `array`/`object`
 * are parsed back out of their JSON text box, falling back to the raw string so
 * a syntax slip surfaces as the server's validation error rather than being
 * silently swallowed here.
 */
function coerceOutgoing(descriptor: PluginSettingDescriptor, current: unknown): unknown {
  if (isBool(descriptor)) return current === true;
  if (current === '' || current === null || current === undefined) return null;
  if (inputType(descriptor) === 'number') return Number(current);
  if (isJsonType(descriptor)) {
    try {
      return JSON.parse(String(current));
    } catch {
      return current;
    }
  }
  return current;
}

async function submitConfigure(): Promise<void> {
  const plugin = configuring.value;
  if (!plugin) return;
  fieldErrors.value = {};
  configError.value = null;
  const changed = buildChangedSettings();
  if (Object.keys(changed).length === 0) {
    toasts.success('No changes to save.');
    closeConfigure();
    return;
  }
  configSubmitting.value = true;
  try {
    await api.updateSettings(plugin.name, changed);
    toasts.success('Settings saved.');
    closeConfigure();
    await refreshAll();
  } catch (e) {
    const errors = pluginValidationErrors(e);
    if (Object.keys(errors).length > 0) {
      fieldErrors.value = errors;
      // A banner as well as the toast: the offending field may be scrolled well
      // out of view in a long schema, and a toast is gone before it is found.
      configError.value = 'Please fix the errors below and try again.';
      toasts.error('Some settings could not be saved — check the highlighted fields.');
    } else {
      configError.value = errMessage(e, 'Failed to save settings.');
      toasts.error(configError.value);
    }
  } finally {
    configSubmitting.value = false;
  }
}

/** Load the auto-update flag on mount; a failure is non-fatal (leave it off). */
async function loadAutoUpdate(): Promise<void> {
  try {
    autoUpdate.value = await api.getAutoUpdate();
  } catch {
    // Non-fatal: the rest of the page works without the auto-update flag.
  }
}

onMounted(() => {
  void loadPlugins();
  void loadCatalog();
  void loadAutoUpdate();
});
</script>

<template>
  <section class="admin-plugins" aria-labelledby="plugins-heading">
    <header class="admin-plugins__head">
      <h1 id="plugins-heading" class="admin-plugins__title">Plugins</h1>
      <div class="admin-plugins__head-actions">
        <Switch
          :model-value="autoUpdate"
          label="Auto-update"
          aria-label="Toggle automatic plugin updates"
          @update:model-value="onToggleAutoUpdate"
        />
        <span class="admin-plugins__head-spacer" />
        <Button
          variant="ghost"
          size="sm"
          left-icon="rewind"
          :loading="checkingUpdates"
          @click="checkForUpdates"
        >
          Check for updates
        </Button>
        <Button
          v-if="updateCount > 0"
          variant="solid"
          size="sm"
          left-icon="forward"
          :loading="updatingAll"
          @click="updateAll"
        >
          Update all ({{ updateCount }})
        </Button>
        <Button variant="ghost" size="sm" left-icon="plus" @click="openAddSource">Add catalog</Button>
        <Button variant="solid" size="sm" left-icon="plus" @click="openInstall">Install from URL</Button>
      </div>
    </header>

    <PageHint>
      Extend Phlix with add-ons from the plugin catalog. On each catalog plugin, toggle its switch
      to <strong>enable/disable</strong> it, <strong>Install</strong> or <strong>Uninstall</strong>
      it, <strong>Configure</strong> its settings, or <strong>Update</strong> when a new version is
      out. Up top, <strong>Check for updates</strong> refreshes availability,
      <strong>Update all</strong> upgrades everything at once, <strong>Auto-update</strong> keeps
      plugins current automatically, and <strong>Add catalog</strong> /
      <strong>Install from URL</strong> pull in sources or plugins from outside the default catalog.
    </PageHint>

    <!-- Catalog sources bar -->
    <div class="admin-plugins__sources" aria-label="Catalog sources">
      <span class="admin-plugins__sources-label">Catalogs</span>
      <Badge v-for="src in catalog.sources" :key="src" tone="neutral">
        <a class="admin-plugins__source-link" :href="src" target="_blank" rel="noopener noreferrer">
          {{ sourceLabel(src) }}
        </a>
        <button
          v-if="src !== catalog.default_source"
          type="button"
          class="admin-plugins__source-remove"
          :disabled="removingSource === src"
          :aria-label="`Remove catalog ${sourceLabel(src)}`"
          @click="removeCatalogSource(src)"
        >
          ×
        </button>
      </Badge>
    </div>

    <!-- Persistent install-failure banner (a fleeting toast is easy to miss;
         a permissions/filesystem error needs to stay readable). -->
    <div v-if="installError" class="admin-plugins__install-error" role="alert">
      <Icon name="alert" class="admin-plugins__install-error-icon" />
      <div class="admin-plugins__install-error-body">
        <strong>Couldn't install the plugin.</strong>
        <span>{{ installError }}</span>
      </div>
      <button
        type="button"
        class="admin-plugins__install-error-dismiss"
        aria-label="Dismiss"
        @click="installError = null"
      >
        ×
      </button>
    </div>

    <!-- Persistent lifecycle-action (enable/disable/update/uninstall) failure
         banner. Enabling can fail for a real, actionable reason (missing API
         key, a plugin onEnable() error) that the operator MUST see — a toast
         alone is too easy to miss. -->
    <div v-if="opError" class="admin-plugins__install-error" role="alert">
      <Icon name="alert" class="admin-plugins__install-error-icon" />
      <div class="admin-plugins__install-error-body">
        <strong>{{ opError.title }}.</strong>
        <span>{{ opError.message }}</span>
      </div>
      <button
        type="button"
        class="admin-plugins__install-error-dismiss"
        aria-label="Dismiss"
        @click="opError = null"
      >
        ×
      </button>
    </div>

    <!-- Catalog browse -->
    <div v-if="catalogLoading" class="admin-plugins__skel"><Skeleton variant="text" :lines="5" /></div>
    <template v-else>
      <p
        v-for="err in catalog.errors"
        :key="err.source"
        class="admin-plugins__catalog-error"
        role="alert"
      >
        Couldn't load catalog <strong>{{ sourceLabel(err.source) }}</strong> — {{ err.error }}
      </p>

      <EmptyState
        v-if="catalogPlugins.length === 0 && catalog.errors.length === 0"
        icon="settings"
        title="No plugins in the catalog"
        description="Add a catalog source or install a plugin directly from its URL."
      >
        <template #actions>
          <Button variant="solid" size="sm" left-icon="plus" @click="openInstall">Install from URL</Button>
        </template>
      </EmptyState>

      <ul v-else class="admin-plugins__grid" aria-label="Catalog plugins">
        <li v-for="p in catalogPlugins" :key="p.name" class="admin-plugins__card">
          <div class="admin-plugins__card-head">
            <h3 class="admin-plugins__card-title">{{ p.title }}</h3>
            <div class="admin-plugins__card-badges">
              <Badge v-if="p.type" tone="info">{{ p.type }}</Badge>
              <Badge v-if="p.installed" tone="success">Installed</Badge>
              <Badge v-if="updateFor(p.name)" tone="warning" class="admin-plugins__update-badge">
                Update → v{{ updateFor(p.name)?.latest_version }}
              </Badge>
            </div>
          </div>
          <p v-if="p.summary || p.description" class="admin-plugins__card-summary">
            {{ p.summary || p.description }}
          </p>
          <div v-if="p.tags.length" class="admin-plugins__card-tags">
            <span v-for="tag in p.tags" :key="tag" class="admin-plugins__tag">{{ tag }}</span>
          </div>
          <div class="admin-plugins__card-actions">
            <template v-if="p.installed">
              <Switch
                :model-value="p.enabled"
                :label="p.enabled ? 'Enabled' : 'Disabled'"
                :aria-label="`Toggle ${p.title}`"
                :disabled="togglingName === p.name"
                @update:model-value="(v) => toggleEnabled(asPlugin(p), v)"
              />
              <span class="admin-plugins__card-spacer" />
              <Button
                v-if="updateFor(p.name)"
                variant="solid"
                size="sm"
                left-icon="forward"
                :loading="updatingName === p.name"
                :aria-label="`Update ${p.title}`"
                @click="updatePlugin(asPlugin(p))"
              >
                Update
              </Button>
              <Button variant="ghost" size="sm" :aria-label="`Configure ${p.title}`" @click="openConfigure(asPlugin(p))">
                Configure
              </Button>
              <Button variant="ghost" size="sm" :aria-label="`Uninstall ${p.title}`" @click="uninstalling = asPlugin(p)">
                Uninstall
              </Button>
            </template>
            <template v-else>
              <Button
                variant="solid"
                size="sm"
                left-icon="plus"
                :loading="installingRepo === p.repo"
                :aria-label="`Install ${p.title}`"
                @click="installFromCatalog(p)"
              >
                Install
              </Button>
              <span class="admin-plugins__card-spacer" />
              <a class="admin-plugins__repo-link" :href="p.repo" target="_blank" rel="noopener noreferrer">Repo ↗</a>
            </template>
          </div>
        </li>
      </ul>
    </template>

    <!-- Other installed plugins (not in any catalog) -->
    <section v-if="orphanPlugins.length" class="admin-plugins__orphans" aria-labelledby="orphans-heading">
      <h2 id="orphans-heading" class="admin-plugins__subtitle">Other installed plugins</h2>
      <p class="admin-plugins__subnote">Installed directly from a URL and not listed in any catalog.</p>
      <table class="admin-plugins__table" aria-label="Other installed plugins">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Version</th>
            <th scope="col">Type</th>
            <th scope="col">Enabled</th>
            <th scope="col" class="admin-plugins__actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plugin in orphanPlugins" :key="plugin.name">
            <td>{{ plugin.name }}</td>
            <td class="admin-plugins__mono">
              {{ plugin.version }}
              <Badge v-if="updateFor(plugin.name)" tone="warning" class="admin-plugins__update-badge">
                → v{{ updateFor(plugin.name)?.latest_version }}
              </Badge>
            </td>
            <td><Badge tone="info">{{ plugin.type }}</Badge></td>
            <td>
              <Switch
                :model-value="plugin.enabled"
                :label="plugin.enabled ? 'Enabled' : 'Disabled'"
                :aria-label="`Toggle ${plugin.name}`"
                :disabled="togglingName === plugin.name"
                @update:model-value="(v) => toggleEnabled(plugin, v)"
              />
            </td>
            <td>
              <div class="admin-plugins__actions">
                <Button
                  v-if="updateFor(plugin.name)"
                  variant="solid"
                  size="sm"
                  left-icon="forward"
                  :loading="updatingName === plugin.name"
                  :aria-label="`Update ${plugin.name}`"
                  @click="updatePlugin(plugin)"
                >
                  Update
                </Button>
                <Button variant="ghost" size="sm" :aria-label="`Configure ${plugin.name}`" @click="openConfigure(plugin)">
                  Configure
                </Button>
                <Button variant="ghost" size="sm" :aria-label="`Uninstall ${plugin.name}`" @click="uninstalling = plugin">
                  Uninstall
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- list-load error (installed list) -->
    <EmptyState
      v-if="error && !loading"
      icon="alert"
      title="Couldn't load installed plugins"
      :description="error"
    >
      <template #actions>
        <Button variant="solid" size="sm" left-icon="rewind" @click="loadPlugins">Retry</Button>
      </template>
    </EmptyState>

    <!-- Install-from-URL modal -->
    <Modal v-model="installOpen" title="Install from URL" @close="closeInstall">
      <form class="admin-plugins__form" @submit.prevent="submitInstall">
        <label class="admin-plugins__field">
          <span class="admin-plugins__label">Plugin URL</span>
          <input
            v-model="installUrl"
            type="url"
            class="admin-plugins__input"
            autocomplete="off"
            placeholder="https://github.com/owner/phlix-plugin-name"
            required
          />
          <span class="admin-plugins__hint">
            A plugin archive or git repository URL to download and install.
          </span>
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeInstall">Cancel</Button>
        <Button variant="solid" size="sm" :loading="installSubmitting" @click="submitInstall">Install</Button>
      </template>
    </Modal>

    <!-- Add-catalog modal -->
    <Modal v-model="addSourceOpen" title="Add catalog" @close="closeAddSource">
      <form class="admin-plugins__form" @submit.prevent="submitAddSource">
        <label class="admin-plugins__field">
          <span class="admin-plugins__label">Catalog URL</span>
          <input
            v-model="newSourceUrl"
            type="url"
            class="admin-plugins__input"
            autocomplete="off"
            placeholder="https://github.com/owner/phlix-plugins"
            required
          />
          <span class="admin-plugins__hint">
            A repository (or direct <code>plugins.json</code> URL) listing installable plugins.
          </span>
        </label>
      </form>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeAddSource">Cancel</Button>
        <Button variant="solid" size="sm" :loading="addingSource" @click="submitAddSource">Add</Button>
      </template>
    </Modal>

    <!-- Uninstall confirm modal -->
    <Modal
      :model-value="uninstalling !== null"
      title="Uninstall plugin"
      size="sm"
      @update:model-value="uninstalling = null"
    >
      <p>
        Uninstall <strong>{{ uninstalling?.name }}</strong>? This removes the plugin and its
        settings and cannot be undone.
      </p>
      <template #footer>
        <Button variant="ghost" size="sm" @click="uninstalling = null">Cancel</Button>
        <Button variant="solid" size="sm" @click="confirmUninstall">Uninstall</Button>
      </template>
    </Modal>

    <!-- Configure modal -->
    <Modal
      :model-value="configuring !== null"
      :title="configTitle"
      size="lg"
      @update:model-value="closeConfigure"
    >
      <div v-if="detailLoading" class="admin-plugins__skel"><Skeleton variant="text" :lines="4" /></div>
      <div v-else class="admin-plugins__config-body" aria-live="polite">
        <!--
          OAuth redirect/callback URL. Scrobbler-style plugins cannot be
          authorised until this exact string is pasted into the provider's own
          app configuration, and this is the only place it is surfaced — so it
          renders above the form whether or not the plugin has settings.
        -->
        <div v-if="redirectUrl" class="admin-plugins__redirect">
          <span :id="`plugin-redirect-url-${configuring?.name}`" class="admin-plugins__label">
            Redirect URL
          </span>
          <div class="admin-plugins__redirect-row">
            <code class="admin-plugins__redirect-value">{{ redirectUrl }}</code>
            <Button
              variant="outline"
              size="sm"
              :aria-label="`Copy the redirect URL for ${configuring?.name}`"
              @click="copyRedirectUrl"
            >
              Copy
            </Button>
          </div>
          <span class="admin-plugins__hint">
            Paste this into the provider's application settings to complete the connection.
          </span>
          <span class="admin-plugins__visually-hidden" role="status">{{ copyAnnouncement }}</span>
        </div>

        <EmptyState
          v-if="!hasSchema"
          icon="settings"
          title="No configurable settings"
          description="This plugin does not expose any settings."
        />
        <form v-else class="admin-plugins__form" @submit.prevent="submitConfigure">
          <div v-if="configError" class="admin-plugins__config-error" role="alert">
            {{ configError }}
          </div>
          <div v-for="[key, descriptor] in schemaEntries" :key="key" class="admin-plugins__field">
            <!-- Boolean → Switch -->
            <template v-if="descriptor.type === 'bool' || descriptor.type === 'boolean'">
              <Switch
                :model-value="formValues[key] === true"
                :label="descriptor.label || key"
                @update:model-value="(v) => (formValues[key] = v)"
              />
            </template>
            <!-- string / number → labelled input -->
            <template v-else>
              <label :for="`plugin-setting-${key}`" class="admin-plugins__label">
                {{ descriptor.label || key }}
                <span
                  v-if="descriptor.required"
                  class="admin-plugins__req"
                  aria-hidden="true"
                  title="Required"
                >*</span>
                <span v-else class="admin-plugins__optional">optional</span>
              </label>
              <div class="admin-plugins__secret-row">
                <input
                  :id="`plugin-setting-${key}`"
                  v-model="formValues[key]"
                  :type="descriptor.secret ? 'password' : inputType(descriptor)"
                  class="admin-plugins__input"
                  :class="{ 'is-invalid': fieldErrors[key] }"
                  :autocomplete="descriptor.secret ? 'new-password' : 'off'"
                  :placeholder="
                    descriptor.secret
                      ? isRemovingSecret(key)
                        ? 'Will be removed on save'
                        : secretStatusFor(key) === null
                          ? 'Leave blank to keep whatever is stored'
                          : secretStatusFor(key)?.set
                            ? 'Leave blank to keep the current value'
                            : 'Not set — enter a value'
                      : undefined
                  "
                  :disabled="descriptor.secret && isRemovingSecret(key)"
                  :aria-describedby="descriptor.secret ? secretStatusId(key) : undefined"
                  :aria-invalid="fieldErrors[key] ? 'true' : undefined"
                />
                <Button
                  v-if="descriptor.secret && isRemovingSecret(key)"
                  variant="ghost"
                  size="sm"
                  :aria-label="`Keep the stored ${descriptor.label || key}`"
                  @click="cancelSecretRemoval(key)"
                >
                  Undo
                </Button>
                <Button
                  v-else-if="canRemoveSecret(key, descriptor)"
                  variant="ghost"
                  size="sm"
                  :aria-label="`Remove the stored ${descriptor.label || key}`"
                  @click="requestSecretRemoval(key)"
                >
                  Remove
                </Button>
              </div>
              <!--
                Secret status. Three states, not two: a server too old to emit
                `secret_status` reports UNKNOWN, and claiming "Not set" there
                would invite an admin to overwrite a perfectly good secret
                believing none was stored.
              -->
              <span
                v-if="descriptor.secret"
                :id="secretStatusId(key)"
                class="admin-plugins__secret-status"
                :class="{ 'is-set': secretStatusFor(key)?.set }"
              >
                <template v-if="isRemovingSecret(key)">
                  <Badge tone="warning" class="admin-plugins__secret-state">Will be removed</Badge>
                  The stored value will be deleted when you save. Undo to keep it.
                </template>
                <template v-else-if="secretStatusFor(key) === null">
                  <Badge tone="neutral" class="admin-plugins__secret-state">Unknown</Badge>
                  This server did not report whether a value is stored. Type a new one to replace
                  whatever is there; leave it blank to keep it.
                </template>
                <template v-else-if="secretStatusFor(key)?.set">
                  <Badge tone="success" class="admin-plugins__secret-state">Configured</Badge>
                  <span class="admin-plugins__secret-dots" aria-hidden="true">{{
                    secretDots(secretStatusFor(key)?.length ?? 0)
                  }}</span>
                  Currently set ({{ secretStatusFor(key)?.length }} characters) — leave blank to keep it.
                </template>
                <template v-else>
                  <Badge tone="neutral" class="admin-plugins__secret-state">Not set</Badge>
                  No value is stored yet.
                </template>
              </span>
            </template>
            <HelpText
              v-if="descriptor.description || descriptor.link"
              :text="descriptor.description"
              :links="helpLinks(descriptor)"
            />
            <span v-if="defaultHint(descriptor)" class="admin-plugins__hint admin-plugins__default-hint">
              Default: <code>{{ defaultHint(descriptor) }}</code>
            </span>
            <span v-if="fieldErrors[key]" class="admin-plugins__error" role="alert">
              {{ fieldErrors[key] }}
            </span>
          </div>
        </form>
      </div>
      <template #footer>
        <Button variant="ghost" size="sm" @click="closeConfigure">Cancel</Button>
        <Button v-if="hasSchema" variant="solid" size="sm" :loading="configSubmitting" @click="submitConfigure">
          Save
        </Button>
      </template>
    </Modal>
  </section>
</template>

<style scoped>
.admin-plugins {
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--space-6);
}
.admin-plugins__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}
.admin-plugins__head-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
}
/* Pushes the install/catalog actions apart from the auto-update toggle on a
   single row; collapses harmlessly once the actions wrap. */
.admin-plugins__head-spacer {
  width: var(--space-2);
}
.admin-plugins__title {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-tight);
  color: var(--text);
}
.admin-plugins__skel {
  padding-block: var(--space-2);
}

/* Sources bar */
.admin-plugins__sources {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}
.admin-plugins__sources-label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-plugins__source-link {
  color: inherit;
  text-decoration: none;
}
.admin-plugins__source-link:hover {
  text-decoration: underline;
}
.admin-plugins__source-remove {
  margin-left: var(--space-1);
  padding: 0 0.25rem;
  border: none;
  background: transparent;
  color: var(--text-subtle);
  font-size: var(--text-sm);
  line-height: 1;
  cursor: pointer;
  border-radius: var(--radius-sm);
}
.admin-plugins__source-remove:hover:not(:disabled) {
  color: var(--danger, #e5484d);
}
.admin-plugins__source-remove:disabled {
  opacity: 0.5;
  cursor: progress;
}

/* Install-failure banner */
.admin-plugins__install-error {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  margin-bottom: var(--space-5);
  border-radius: var(--radius-md);
  border: 1px solid var(--danger, #e5484d);
  background: var(--danger-soft, rgba(229, 72, 77, 0.1));
  color: var(--text);
}
.admin-plugins__install-error-icon {
  flex: none;
  width: 18px;
  height: 18px;
  margin-top: 1px;
  color: var(--danger, #e5484d);
}
.admin-plugins__install-error-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: var(--text-sm);
  min-width: 0;
  flex: 1;
  word-break: break-word;
}
.admin-plugins__install-error-dismiss {
  flex: none;
  border: none;
  background: transparent;
  color: var(--text-subtle);
  font-size: var(--text-md);
  line-height: 1;
  cursor: pointer;
  padding: 0 var(--space-1);
  border-radius: var(--radius-sm);
}
.admin-plugins__install-error-dismiss:hover {
  color: var(--text);
}

/* Catalog grid */
.admin-plugins__catalog-error {
  font-size: var(--text-sm);
  color: var(--danger, #e5484d);
  margin-bottom: var(--space-3);
}
.admin-plugins__grid {
  list-style: none;
  margin: 0 0 var(--space-6);
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}
.admin-plugins__card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--surface);
}
.admin-plugins__card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
}
.admin-plugins__card-title {
  font-weight: var(--font-semibold);
  font-size: var(--text-md);
  color: var(--text);
}
.admin-plugins__card-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  flex-shrink: 0;
}
/* "Update → vX" pill — used both on a catalog card and inline in the orphan
   table's version cell. Keeps the version suffix on one line. */
.admin-plugins__update-badge {
  white-space: nowrap;
}
.admin-plugins__card-summary {
  font-size: var(--text-sm);
  color: var(--text-muted);
  line-height: var(--leading-normal, 1.5);
}
.admin-plugins__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}
.admin-plugins__tag {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  padding: 2px var(--space-2);
  border-radius: var(--radius-pill, 999px);
  background: var(--surface-subtle, rgba(127, 127, 127, 0.12));
}
.admin-plugins__card-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-2);
}
.admin-plugins__card-spacer {
  flex: 1 1 auto;
}
.admin-plugins__repo-link {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  text-decoration: none;
}
.admin-plugins__repo-link:hover {
  color: var(--text-muted);
  text-decoration: underline;
}

/* Orphan installed plugins */
.admin-plugins__orphans {
  margin-top: var(--space-6);
}
.admin-plugins__subtitle {
  font-family: var(--font-display);
  font-weight: var(--font-semibold);
  font-size: var(--text-lg);
  color: var(--text);
}
.admin-plugins__subnote {
  font-size: var(--text-xs);
  color: var(--text-subtle);
  margin-bottom: var(--space-3);
}
.admin-plugins__table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}
.admin-plugins__table th {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.admin-plugins__table td {
  padding: var(--space-2) var(--space-3);
  color: var(--text-muted);
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: middle;
}
.admin-plugins__mono {
  font-variant-numeric: tabular-nums;
  color: var(--text-subtle);
  white-space: nowrap;
}
.admin-plugins__mono .admin-plugins__update-badge {
  margin-left: var(--space-2);
}
.admin-plugins__actions-col {
  width: 1%;
}
.admin-plugins__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Forms */
.admin-plugins__config-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-plugins__config-error {
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--danger, #e5484d);
  border-radius: var(--radius-md);
  color: var(--danger, #e5484d);
  font-size: var(--text-sm);
}
.admin-plugins__redirect {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-subtle, rgba(127, 127, 127, 0.08));
}
.admin-plugins__redirect-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.admin-plugins__redirect-value {
  flex: 1;
  min-width: 0;
  padding: var(--space-1) var(--space-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text);
  font-family: var(--font-mono, monospace);
  font-size: var(--text-xs);
  word-break: break-all;
}
/* Keeps the copy outcome available to assistive tech without showing it twice. */
.admin-plugins__visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.admin-plugins__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.admin-plugins__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.admin-plugins__label {
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-subtle);
}
.admin-plugins__req {
  color: var(--accent);
  margin-left: 2px;
}
.admin-plugins__optional {
  margin-left: var(--space-2);
  font-size: var(--text-2xs, 0.6875rem);
  font-weight: var(--font-normal, 400);
  letter-spacing: normal;
  text-transform: none;
  color: var(--text-subtle);
}
.admin-plugins__secret-row {
  display: flex;
  align-items: center;
  gap: var(--space-2, 0.5rem);
}
.admin-plugins__secret-row .admin-plugins__input {
  flex: 1;
  min-width: 0;
}
.admin-plugins__secret-status {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-plugins__secret-state {
  margin-right: var(--space-2);
  vertical-align: middle;
}
.admin-plugins__secret-status.is-set {
  color: var(--text-muted);
}
.admin-plugins__secret-dots {
  margin-right: var(--space-2);
  letter-spacing: 0.15em;
  color: var(--success, #46a758);
  font-variant-numeric: tabular-nums;
}
.admin-plugins__default-hint code {
  font-family: var(--font-mono, monospace);
  font-size: 0.9em;
  padding: 0 4px;
  border-radius: var(--radius-sm);
  background: var(--surface-subtle, rgba(127, 127, 127, 0.12));
}
.admin-plugins__input {
  width: 100%;
  height: var(--control-h);
  padding-inline: var(--control-pad-x);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  font: inherit;
  font-size: var(--text-sm);
  transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.admin-plugins__input:focus-visible {
  outline: none;
  border-color: var(--accent-ring);
  box-shadow: 0 0 0 3px var(--accent-soft);
}
.admin-plugins__input.is-invalid {
  border-color: var(--danger, #e5484d);
}
.admin-plugins__input::placeholder {
  color: var(--text-subtle);
}
.admin-plugins__hint {
  font-size: var(--text-xs);
  color: var(--text-subtle);
}
.admin-plugins__error {
  font-size: var(--text-xs);
  color: var(--danger, #e5484d);
}
@media (prefers-reduced-motion: reduce) {
  .admin-plugins__input {
    transition: none;
  }
}
</style>
