/**
 * S13 — the MEASUREMENT behind the reachability warning in `CaptionOverlay.vue`.
 *
 * `CaptionOverlay.rebind()` re-reads a sidecar's cues on the `<track>`'s own
 * `load` event, gated on `el.readyState !== 2`, and finds that element by an
 * identity match (`el.track === resolvedTextTrack`). Every test that exercises
 * that branch supplies a hand-rolled `fakeTrackEl` — and it has to, because jsdom
 * implements none of the media surface it needs.
 *
 * This file pins that fact instead of leaving it as folklore. It asserts nothing
 * about Phlix code; it asserts what the TEST ENVIRONMENT can and cannot express,
 * so that:
 *
 *   1. nobody reads a green captions suite as evidence about a browser, and
 *   2. the day jsdom does implement `HTMLMediaElement.textTracks` /
 *      `HTMLTrackElement.track`, this file goes RED — which is the signal to
 *      revisit the "not reachable from a real jsdom <video>" warning on
 *      `trackElementFor` and to convert the doubles into real-DOM tests.
 *
 * Measured 2026-08-02 on jsdom 29.1.1.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';

/** A real jsdom `<video>` with a real `<track kind="subtitles" default>` child. */
function realVideoWithTrack(): { video: HTMLVideoElement; track: HTMLTrackElement } {
  const video = document.createElement('video');
  video.src = 'http://x/movie.mp4';
  const track = document.createElement('track');
  track.kind = 'subtitles';
  track.src = 'http://x/sub.vtt';
  track.srclang = 'en';
  track.label = 'English';
  track.default = true;
  video.appendChild(track);
  document.body.appendChild(video);
  return { video, track };
}

describe('jsdom media surface — what the captions tests can and cannot reach', () => {
  it('never loads media: <video>.readyState and <track>.readyState are pinned at 0', async () => {
    const { video, track } = realVideoWithTrack();
    expect(video.readyState).toBe(0); // HAVE_NOTHING
    expect(track.readyState).toBe(0); // HTMLTrackElement.NONE — never 1 (LOADING) / 2 (LOADED)
    // …and they stay there. Nothing in jsdom advances them, so no elapsed time,
    // event, or tick can drive the `readyState !== 2` guard from a real element.
    await new Promise((r) => setTimeout(r, 20));
    expect(video.readyState).toBe(0);
    expect(track.readyState).toBe(0);
    // The constant the guard compares against does exist — it is only the
    // instance value that never gets there.
    expect(HTMLTrackElement.LOADED).toBe(2);
  });

  it('does not build a TextTrackList from <track> children, so resolveTextTrack finds nothing', () => {
    const { video } = realVideoWithTrack();
    expect(video.querySelectorAll('track')).toHaveLength(1); // the element IS in the DOM…
    expect(video.textTracks.length).toBe(0); // …but jsdom exposes no TextTrack for it
  });

  it('does not implement HTMLTrackElement.track, so the identity match can never succeed', () => {
    const { track } = realVideoWithTrack();
    // `trackElementFor()` returns the element whose `el.track === track`. With
    // `el.track` undefined, that comparison is false for every real element and
    // for every double — which is why a Player-level mount never attaches the
    // `<track>` load listener and relies on the S13 deferred re-check instead.
    expect(track.track).toBeUndefined();
  });
});
