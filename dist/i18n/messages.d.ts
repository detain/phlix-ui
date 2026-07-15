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
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
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
export declare const DEFAULT_MESSAGES: {
    common: {
        retry: string;
        close: string;
        dismiss: string;
        loading: string;
        notifications: string;
        noMatches: string;
        searchPlaceholder: string;
        selectPlaceholder: string;
    };
    shell: {
        skipToContent: string;
        primaryNav: string;
        openMenu: string;
        menu: string;
        openCommandPalette: string;
        browse: string;
        explore: string;
        recommendations: string;
        watchHistory: string;
        settings: string;
        themeToggleLabel: string;
        account: string;
        accountNamed: string;
        signOut: string;
        signIn: string;
    };
    palette: {
        title: string;
        placeholder: string;
        commands: string;
        recent: string;
        noResults: string;
        searchLibrary: string;
        goToBrowse: string;
        goToSettings: string;
        themeNocturne: string;
        themeDaylight: string;
        themeMidnight: string;
        toggleDensity: string;
        toggleReducedMotion: string;
        toggleAtmosphere: string;
        resetPreferences: string;
        groupNavigation: string;
        groupTheme: string;
        groupPreferences: string;
    };
    auth: {
        loginEyebrow: string;
        loginTitle: string;
        loginSubtitle: string;
        signupEyebrow: string;
        signupTitle: string;
        signupSubtitle: string;
        email: string;
        emailPlaceholder: string;
        password: string;
        passwordPlaceholder: string;
        passwordSignupPlaceholder: string;
        username: string;
        usernamePlaceholder: string;
        usernameOrEmail: string;
        usernameOrEmailPlaceholder: string;
        confirmPassword: string;
        confirmPasswordPlaceholder: string;
        showPassword: string;
        hidePassword: string;
        signIn: string;
        signingIn: string;
        createAccount: string;
        creatingAccount: string;
        orContinueWith: string;
        loginFooterPrompt: string;
        signupLink: string;
        signupFooterPrompt: string;
        signInLink: string;
        emailRequired: string;
        emailInvalid: string;
        passwordRequired: string;
        identifierRequired: string;
        usernameRequired: string;
        usernameMinLength: string;
        passwordChoose: string;
        passwordMinLength: string;
        passwordMismatch: string;
        signInFailed: string;
        signupFailed: string;
    };
    connect: {
        eyebrow: string;
        title: string;
        subtitle: string;
        addressLabel: string;
        addressPlaceholder: string;
        hint: string;
        connect: string;
        connecting: string;
        addressRequired: string;
        invalidAddress: string;
        unreachable: string;
        connectAnyway: string;
        plaintextWarning: string;
        plaintextConfirm: string;
        originConfirm: string;
        confirmContinue: string;
        confirmCancel: string;
    };
    player: {
        play: string;
        pause: string;
        back: string;
        nowPlaying: string;
        previousEpisode: string;
        nextEpisode: string;
        skipIntro: string;
        skipOutro: string;
        skipLabelIntro: string;
        skipLabelCredits: string;
        skipLabelSkipCredits: string;
        keyboardShortcuts: string;
        sleepTimer: string;
        pip: string;
        exitPip: string;
        theater: string;
        exitTheater: string;
        fullscreen: string;
        exitFullscreen: string;
        miniPlayer: string;
        expand: string;
        closePlayer: string;
        seek: string;
        mute: string;
        unmute: string;
        volume: string;
        playbackSpeed: string;
        quality: string;
        qualityAuto: string;
        qualityAutoActive: string;
        qualityOriginal: string;
        directStream: string;
        qualityDirectStream: string;
        captionsOn: string;
        captionsOff: string;
        captionsAndSubtitles: string;
        subtitles: string;
        subtitleTrack: string;
        off: string;
        audio: string;
        audioTrack: string;
        captionStyle: string;
        size: string;
        captionSize: string;
        color: string;
        captionColor: string;
        background: string;
        captionBackground: string;
        edge: string;
        captionEdge: string;
        chapters: string;
        chapterList: string;
        noChapters: string;
        keyboard: string;
        resumePlayback: string;
        resumeFrom: string;
        resume: string;
        startOver: string;
        upNext: string;
        startsIn: string;
        playNow: string;
        cancel: string;
        transcodePreparingHeading: string;
        transcodePreparingTitled: string;
        transcodePreparingUntitled: string;
        transcodeHeading: string;
        transcodeBodyTitled: string;
        transcodeBodyUntitled: string;
        goBack: string;
    };
    syncplay: {
        syncPlay: string;
        inRoom: string;
        createRoom: string;
        joinRoom: string;
        leaveRoom: string;
        members: string;
        synced: string;
        outOfSync: string;
        reSyncing: string;
        roomName: string;
        roomId: string;
        publicRoom: string;
        privateRoom: string;
        create: string;
        join: string;
        cancel: string;
        loading: string;
        noRooms: string;
        errorCreate: string;
        errorJoin: string;
        errorLeave: string;
        yourRole: string;
        roleOwner: string;
        roleModerator: string;
        roleMember: string;
        title: string;
        roomNamePlaceholder: string;
        roomIdPlaceholder: string;
        publicHint: string;
        privateHint: string;
        publicRooms: string;
        waitingForMembers: string;
        rewind: string;
        fastForward: string;
        playAll: string;
        pauseAll: string;
    };
    music: {
        title: string;
        nav: string;
        artists: string;
        albums: string;
        tracks: string;
        play: string;
        pause: string;
        previous: string;
        next: string;
        seek: string;
        noArtists: string;
        noAlbums: string;
        noTracks: string;
        albumCount: string;
        trackCount: string;
        year: string;
        duration: string;
        nowPlaying: string;
        loading: string;
        streamError: string;
        crossfade: string;
        crossfadeDuration: string;
        crossfadeSeconds: string;
        gapless: string;
        audioQuality: string;
        qualityLow: string;
        qualityMedium: string;
        qualityHigh: string;
        qualityLossless: string;
    };
    settings: {
        theme: string;
        accent: string;
        accentColor: string;
        display: string;
        atmosphere: string;
        playback: string;
        subtitles: string;
        density: string;
        gridDensity: string;
        cardSize: string;
        motion: string;
        filmGrainGlow: string;
        autoplayNext: string;
        defaultVolume: string;
        defaultQuality: string;
        crossfade: string;
        crossfadeDuration: string;
        gaplessEnabled: string;
        preferredAudioQuality: string;
        defaultLanguage: string;
        defaultSubtitleLanguage: string;
        captionSize: string;
        captionColor: string;
        captionBackground: string;
        captionEdge: string;
        resetAll: string;
        resetConfirm: string;
        resetDone: string;
        preferences: string;
        title: string;
        sectionsLabel: string;
        tabAppearance: string;
        tabPlayback: string;
        tabServer: string;
        unsaved: string;
        saveGroup: string;
        groupSaved: string;
        groupSaveError: string;
        loadFailed: string;
        loadErrorTitle: string;
    };
    explore: {
        title: string;
    };
    recommendations: {
        title: string;
    };
    history: {
        title: string;
    };
    season: {
        play: string;
        watchlist: string;
        inFavorites: string;
        addFavorite: string;
        removeFavorite: string;
        markWatched: string;
        watched: string;
        markWatchedAria: string;
        markUnwatchedAria: string;
        noEpisodes: string;
    };
    parental: {
        title: string;
        schedules: string;
        tags: string;
        streamLimits: string;
        createSchedule: string;
        editSchedule: string;
        scheduleName: string;
        scheduleNamePlaceholder: string;
        startTime: string;
        endTime: string;
        days: string;
        active: string;
        inactive: string;
        addTag: string;
        tagName: string;
        tagNamePlaceholder: string;
        tagType: string;
        tagBlocked: string;
        tagAllowed: string;
        updateLimits: string;
        maxConcurrentStreams: string;
        maxBandwidth: string;
        maxBandwidthPlaceholder: string;
        noProfileSelected: string;
        noProfileSelectedHint: string;
        noSchedules: string;
        noSchedulesHint: string;
        noTags: string;
        noTagsHint: string;
        scheduleUpdated: string;
        scheduleCreated: string;
        scheduleDeleted: string;
        tagAdded: string;
        tagRemoved: string;
        streamLimitsUpdated: string;
        deleteScheduleConfirm: string;
        removeTagConfirm: string;
        loadErrorSchedules: string;
        loadErrorTags: string;
        loadErrorStreamLimits: string;
        retry: string;
    };
    admin: {
        'transcoding.title': string;
        'transcoding.preferredAccelerator': string;
        'transcoding.hdrOutput': string;
        'transcoding.toneMapMode': string;
    };
};
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
/**
 * Merge a consumer override onto the English defaults, per-group. Always returns a
 * fresh object (never the `DEFAULT_MESSAGES` reference, and never mutates it). A
 * non-object group override (e.g. `null` slipping past the types) is ignored so a
 * misuse degrades to the English default rather than throwing.
 */
export declare function mergeMessages(overrides?: PhlixMessagesConfig): PhlixMessages;
/**
 * Build a `t(key, params?)` resolver bound to the English defaults overlaid with
 * `overrides`. An unknown key (typo, or a not-yet-adopted string) echoes the key
 * itself, so `t()` never returns `undefined`/empty.
 */
export declare function createTranslator(overrides?: PhlixMessagesConfig): Translate;
