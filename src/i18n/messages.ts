/**
 * i18n-readiness seam (R6.5c).
 *
 * A tiny, dependency-free message catalog + resolver. The package ships English
 * defaults; a consumer can override any adopted string through
 * `PhlixAppConfig.messages` (a deep-partial map). Omitting `messages` renders the
 * current English UI byte-for-byte — this is a purely additive seam, not a
 * localization framework. The Vue glue lives in `composables/useMessages.ts`.
 *
 * This module is pure (no Vue, no DOM) so it is SSR-safe and trivially unit-tested.
 *
 * Catalog shape is intentionally TWO levels — `group.key` — so the override type
 * and the `MessageKey` union stay simple and the merge is a single per-group spread.
 */

/**
 * English defaults for the adopted ("cut-line") end-user chrome: shared primitive
 * fallbacks, the app shell, the command palette + built-ins, auth (incl.
 * validation), and the Player surface. Lower-traffic settings/Browse copy and the
 * operator-facing admin pages keep their inline English and can adopt this same
 * seam incrementally later — every key here is backed by a real adoption site.
 *
 * `satisfies` (not `as const`) keeps the value types as `string` — exactly what the
 * override type wants — while still narrowing the keys for `MessageKey`.
 */
export const DEFAULT_MESSAGES = {
  common: {
    retry: 'Retry',
    close: 'Close',
    dismiss: 'Dismiss',
    loading: 'Loading',
    notifications: 'Notifications',
    noMatches: 'No matches',
    searchPlaceholder: 'Search…',
    selectPlaceholder: 'Select…',
  },
  shell: {
    skipToContent: 'Skip to content',
    primaryNav: 'Primary',
    openMenu: 'Open navigation menu',
    menu: 'Menu',
    openCommandPalette: 'Open command palette (⌘K)',
    browse: 'Browse',
    settings: 'Settings',
    themeToggleLabel: 'Theme: {current} (switch to {next})',
    account: 'Account',
    accountNamed: 'Account: {name}',
    signOut: 'Sign out',
    signIn: 'Sign in',
  },
  palette: {
    title: 'Command palette',
    placeholder: 'Type a command or search…',
    commands: 'Commands',
    recent: 'Recent',
    noResults: 'No matching commands',
    searchLibrary: 'Search library for “{query}”',
    goToBrowse: 'Go to Browse',
    goToSettings: 'Go to Settings',
    themeNocturne: 'Theme: Nocturne',
    themeDaylight: 'Theme: Daylight',
    themeMidnight: 'Theme: Midnight',
    toggleDensity: 'Toggle density',
    toggleReducedMotion: 'Toggle reduced motion',
    toggleAtmosphere: 'Toggle atmosphere',
    resetPreferences: 'Reset preferences',
    groupNavigation: 'Navigation',
    groupTheme: 'Theme',
    groupPreferences: 'Preferences',
  },
  auth: {
    // Card chrome
    loginEyebrow: 'Member access',
    loginTitle: 'Welcome back',
    loginSubtitle: 'Sign in to continue to your cinema.',
    signupEyebrow: 'Now showing',
    signupTitle: 'Create your account',
    signupSubtitle: 'Your private cinema, anywhere.',
    // Fields
    email: 'Email',
    emailPlaceholder: 'you@example.com',
    password: 'Password',
    passwordPlaceholder: 'Your password',
    passwordSignupPlaceholder: 'At least 8 characters',
    username: 'Username',
    usernamePlaceholder: 'Your username',
    usernameOrEmail: 'Username or email',
    usernameOrEmailPlaceholder: 'you@example.com or your username',
    confirmPassword: 'Confirm password',
    confirmPasswordPlaceholder: 'Repeat your password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    // Actions
    signIn: 'Sign in',
    signingIn: 'Signing in…',
    createAccount: 'Create account',
    creatingAccount: 'Creating account…',
    orContinueWith: 'or continue with',
    // Footers (the footer cross-links get their own keys so a consumer can word
    // the "go to the other screen" link independently of the submit buttons)
    loginFooterPrompt: 'New to Phlix?',
    signupLink: 'Create an account',
    signupFooterPrompt: 'Already have an account?',
    signInLink: 'Sign in',
    // Validation + failures
    emailRequired: 'Enter your email.',
    emailInvalid: 'Enter a valid email address.',
    passwordRequired: 'Enter your password.',
    identifierRequired: 'Enter your username or email.',
    usernameRequired: 'Choose a username.',
    usernameMinLength: 'Username must be at least 3 characters.',
    passwordChoose: 'Choose a password.',
    passwordMinLength: 'Password must be at least 8 characters.',
    passwordMismatch: 'Passwords do not match.',
    signInFailed: 'Sign in failed.',
    signupFailed: 'Registration failed.',
  },
  connect: {
    // First-run "point this app at your server" screen (native clients)
    eyebrow: 'Get started',
    title: 'Connect to your server',
    subtitle: 'Enter the address of your Phlix media server or hub.',
    addressLabel: 'Server address',
    addressPlaceholder: 'https://your-server:8096',
    hint: 'For a server on your network this is usually its local address, e.g. http://192.168.1.50:8096.',
    connect: 'Connect',
    connecting: 'Connecting…',
    addressRequired: 'Enter your server address.',
    invalidAddress: 'Enter a valid http:// or https:// server address.',
    unreachable: "Couldn't reach a Phlix server at that address. Check it and try again.",
    connectAnyway: 'Connect anyway',
    // Non-blocking warning shown for an http:// address on a PUBLIC host —
    // credentials would travel unencrypted and could be intercepted.
    plaintextWarning:
      'This server is unencrypted (http). Your login could be intercepted in transit. Use https if you can.',
    plaintextConfirm: 'Connect over http anyway',
    // One-time confirm before the first authed call sends your token to a NEW
    // origin you have not connected to before.
    originConfirm: 'You are connecting to {origin} for the first time. Your sign-in token will be sent there. Continue?',
    confirmContinue: 'Yes, connect',
    confirmCancel: 'Cancel',
  },
  player: {
    // Transport + chrome (Player.vue)
    play: 'Play',
    pause: 'Pause',
    back: 'Back',
    nowPlaying: 'Now playing',
    // Prev/next episode (series content)
    previousEpisode: 'Previous episode',
    nextEpisode: 'Next episode',
    // Skip intro / outro markers (server playback-info)
    skipIntro: 'Skip intro',
    skipOutro: 'Skip outro',
    keyboardShortcuts: 'Keyboard shortcuts',
    pip: 'Picture-in-picture',
    exitPip: 'Exit picture-in-picture',
    theater: 'Theater mode',
    exitTheater: 'Exit theater mode',
    fullscreen: 'Fullscreen',
    exitFullscreen: 'Exit fullscreen',
    // Mini player
    miniPlayer: 'Mini player',
    expand: 'Expand to full player',
    closePlayer: 'Close player',
    // Scrubber
    seek: 'Seek',
    // Volume / speed / quality
    mute: 'Mute',
    unmute: 'Unmute',
    volume: 'Volume',
    playbackSpeed: 'Playback speed',
    quality: 'Quality',
    // Captions menu
    captionsOn: 'Captions (on)',
    captionsOff: 'Captions (off)',
    captionsAndSubtitles: 'Captions and subtitles',
    subtitles: 'Subtitles',
    subtitleTrack: 'Subtitle track',
    off: 'Off',
    audio: 'Audio',
    audioTrack: 'Audio track',
    captionStyle: 'Caption style',
    size: 'Size',
    captionSize: 'Caption size',
    color: 'Color',
    captionColor: 'Caption color',
    background: 'Background',
    captionBackground: 'Caption background',
    edge: 'Edge',
    captionEdge: 'Caption edge',
    // Shortcuts help overlay (the per-row shortcut descriptions stay English —
    // they live in the shared exported `shortcuts.ts` keymap, not a component)
    keyboard: 'Keyboard',
    // Resume prompt
    resumePlayback: 'Resume playback',
    resumeFrom: 'Resume from {time}?',
    resume: 'Resume',
    startOver: 'Start over',
    // Up-next card
    upNext: 'Up next',
    startsIn: 'Starts in {seconds}s',
    playNow: 'Play now',
    cancel: 'Cancel',
    // Transcode "preparing" overlay (server is transcoding to HLS on demand)
    transcodePreparingHeading: 'Preparing your stream…',
    transcodePreparingTitled:
      '“{title}” is being converted to a format your browser can play. This starts in a moment.',
    transcodePreparingUntitled:
      'This title is being converted to a format your browser can play. This starts in a moment.',
    // Transcode failure notice (shown only when the on-demand transcode failed)
    transcodeHeading: 'Can’t play this file here',
    transcodeBodyTitled:
      'We couldn’t prepare a playable version of “{title}” right now. Please try again later.',
    transcodeBodyUntitled:
      'We couldn’t prepare a playable version of this title right now. Please try again later.',
    goBack: 'Go back',
  },
  settings: {
    // Appearance section titles + radiogroup labels
    theme: 'Theme',
    accent: 'Accent',
    accentColor: 'Accent color',
    display: 'Display',
    atmosphere: 'Atmosphere',
    playback: 'Playback',
    subtitles: 'Subtitles',
    // Display rows
    density: 'Density',
    gridDensity: 'Grid density',
    cardSize: 'Card size',
    motion: 'Motion',
    // Atmosphere / playback switches + rows
    filmGrainGlow: 'Film-grain + ambient glow',
    autoplayNext: 'Autoplay next episode',
    defaultVolume: 'Default volume',
    defaultQuality: 'Default quality',
    // Subtitles rows
    defaultLanguage: 'Default language',
    defaultSubtitleLanguage: 'Default subtitle language',
    captionSize: 'Caption size',
    captionColor: 'Caption color',
    captionBackground: 'Caption background',
    captionEdge: 'Caption edge',
    // Reset control
    resetAll: 'Reset all preferences',
    resetConfirm: 'Click again to confirm reset',
    resetDone: 'Preferences reset to defaults.',
    // SettingsPage chrome (page heading + tab strip)
    preferences: 'Preferences',
    title: 'Settings',
    sectionsLabel: 'Settings sections',
    tabAppearance: 'Appearance',
    tabPlayback: 'Playback',
    tabServer: 'Server',
    // SettingsForm (Server tab) chrome
    unsaved: 'Unsaved',
    saveGroup: 'Save {name}',
    groupSaved: '{name} settings saved.',
    groupSaveError: 'Failed to save {name} settings',
    loadFailed: 'Failed to load settings',
    loadErrorTitle: "Couldn't load settings",
    // NOTE: the appearance option *enum* labels (theme/accent/density/grid/motion/
    // quality/subtitle-language names) AND the SettingsForm Server-config labels
    // (the 9 group names + per-key labels like "TMDB API Key"/"Trakt client ID"/
    // "Enable UPnP") deliberately stay inline-English — operator/technical copy,
    // matching the R6.5c decision to keep enum + admin labels English.
  },
} satisfies Record<string, Record<string, string>>;

/** The full English catalog type (derived from the defaults — single source of truth). */
export type PhlixMessages = typeof DEFAULT_MESSAGES;

/** A top-level catalog group, e.g. `'player'`. */
export type MessageGroup = keyof PhlixMessages;

/**
 * The consumer-supplied override map: every group and every key is optional, so a
 * consumer overrides only the strings they care about and the rest fall back to the
 * English defaults (the "deep partial override").
 */
export type PhlixMessagesConfig = {
  [G in MessageGroup]?: Partial<PhlixMessages[G]>;
};

/** A dotted message key, e.g. `'player.play'` — the argument to `t()`. */
export type MessageKey = {
  [G in MessageGroup]: `${G & string}.${keyof PhlixMessages[G] & string}`;
}[MessageGroup];

/** Interpolation params for `t(key, params)` — `{name}` placeholders in the template. */
export type TranslateParams = Record<string, string | number>;

/** The resolver returned by `createTranslator` / `useMessages().t`. */
export type Translate = (key: MessageKey, params?: TranslateParams) => string;

/** `{name}` placeholder pattern. `\w` = `[A-Za-z0-9_]`, which covers all catalog params. */
const PARAM_PATTERN = /\{(\w+)\}/g;

/**
 * Merge a consumer override onto the English defaults, per-group. Always returns a
 * fresh object (never the `DEFAULT_MESSAGES` reference, and never mutates it). A
 * non-object group override (e.g. `null` slipping past the types) is ignored so a
 * misuse degrades to the English default rather than throwing.
 */
export function mergeMessages(overrides?: PhlixMessagesConfig): PhlixMessages {
  const out: Record<string, Record<string, string>> = {};
  for (const group of Object.keys(DEFAULT_MESSAGES) as MessageGroup[]) {
    const base = DEFAULT_MESSAGES[group] as Record<string, string>;
    const over = overrides?.[group];
    out[group] =
      over && typeof over === 'object' ? { ...base, ...(over as Record<string, string>) } : { ...base };
  }
  return out as PhlixMessages;
}

/** Replace `{name}` placeholders. A missing/`undefined`/`null` param is left literal (debuggable). */
function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template;
  return template.replace(PARAM_PATTERN, (match, name: string) => {
    const value = params[name];
    return value === undefined || value === null ? match : String(value);
  });
}

/**
 * Build a `t(key, params?)` resolver bound to the English defaults overlaid with
 * `overrides`. An unknown key (typo, or a not-yet-adopted string) echoes the key
 * itself, so `t()` never returns `undefined`/empty.
 */
export function createTranslator(overrides?: PhlixMessagesConfig): Translate {
  const messages = mergeMessages(overrides) as Record<string, Record<string, string>>;
  return (key, params) => {
    const dot = key.indexOf('.');
    const group = dot === -1 ? '' : key.slice(0, dot);
    const leaf = dot === -1 ? '' : key.slice(dot + 1);
    const groupObj = messages[group];
    const template = groupObj ? groupObj[leaf] : undefined;
    return typeof template === 'string' ? interpolate(template, params) : key;
  };
}
