---
description: How the player decides direct play vs. server transcode (video-codec allowlist + capability probe) and how the transcode job is started.
paths:
  - src/components/Player.vue
  - src/components/player/playback.ts
  - src/components/player/TranscodeNotice.vue
---

# Direct play vs. transcode

- Two gates, in order: the synchronous container check (`needsTranscode` over
  `DIRECT_PLAY_EXTENSIONS` / `TRANSCODE_EXTENSIONS`, so the overlay paints on the first frame),
  then the async `needsTranscodeWithCapabilities(sources, playbackAudioTracks, videoCodec)`.
- Video codecs are an ALLOWLIST, never a denylist. `videoCodecPolicy()` returns `direct`
  (`h264` + aliases), `probe` (`hevc`/`av1`/`vp9`/`vp8`/`theora` — ask MediaCapabilities /
  `canPlayType`), or `transcode` for anything else reported. A HEVC-only guard applied to the
  whole container killed direct play for plain H.264 mp4s AND silently black-screened every
  other undecodable codec (`mpeg4`, `msmpeg4v1/2/3`, `mpeg1video`, `mjpeg`).
- Unknown / absent codec (`''`) → `direct`, deliberately. Do NOT re-describe the `<video>`
  error as a backstop: an undecodable video with decodable audio fires no `error` event, so
  `onVideoError` never runs and the viewer sits on a permanent black screen with sound.
- The codec comes from the DETAIL response via `videoCodecFromStreams(props.media.streams)`
  (`stream_type === 'video'`); `playback-info` emits audio + subtitle rows only. Stream columns
  arrive JSON-encoded as strings — never `===` `stream_index`/`width`/`height` against a number.
- Never build a container MIME by concatenation (`video/${ext}`) — use
  `containerMimeForExtension()`. `video/m4v` / `video/ogv` are MIME types no browser knows, so
  every probe against them (the audio probe included) answers "undecodable".
- Flipping `transcodeNeeded` must also START the job (`beginTranscode(...)`): the synchronous
  starts in `onMounted` / `evaluateForCurrentMedia` have already run by then, so a flag with no
  job hangs on the "Preparing…" overlay forever.
- Keep the probe watch `{ immediate: true }` (playback-info can already be present at mount, so
  a lazy watch may never fire), guard a late verdict with the invalidation token, and re-check
  `transcodeNeeded` after the `await` so the transcode starts exactly once.
- `TranscodeNotice` copy must not blame the file or its format — the same notice appears when
  the server merely REFUSED the request (e.g. a parental-control 404). Keys:
  `player.transcodeHeading` / `transcodeBodyTitled` / `transcodeBodyUntitled` in
  `src/i18n/messages.ts`.
