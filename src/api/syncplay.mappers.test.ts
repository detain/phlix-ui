/**
 * S264 — the wire→UI mappers `src/api/syncplay.ts` exports.
 *
 * `syncplay.routes.test.ts` (S276) exercises these THROUGH the fake server, so
 * it only ever feeds them the one fixture shape the server emits. These are the
 * coercion branches that fixture cannot reach: a numeric field arriving as a
 * STRING, and a group whose `playback_state` is missing so the mapper has to
 * fall back to `is_playing`.
 *
 * Both are real wire conditions. PHP's `json_encode` emits a string for a
 * numeric column read out of MySQL without a cast, and
 * `SyncPlaySnapshotService::listGroups()`'s reduced row carries `is_playing`
 * INSTEAD of `playback_state` — which is why the fallback exists at all.
 *
 * @copyright 2026 Joe Huss <detain@interserver.net>
 * @license MIT
 */

import { describe, it, expect } from 'vitest';
import { normalizeGroup, groupToSession, normalizeMembers, type RawSyncPlayGroup } from './syncplay';

describe('num() — numeric coercion off the wire', () => {
    it('accepts a numeric STRING for member_count', () => {
        // `{"member_count": "7"}` is what an uncast MySQL column serialises to.
        expect(normalizeGroup({ group_id: 'g1', member_count: '7' } as unknown as RawSyncPlayGroup).memberCount).toBe(7);
    });

    it('accepts a numeric STRING for playback_position', () => {
        const s = groupToSession({ group_id: 'g1', playback_position: '123.5' } as unknown as RawSyncPlayGroup);
        expect(s.playbackPosition).toBe(123.5);
    });

    it('falls back for a BLANK string rather than coercing it to 0 by accident', () => {
        // `Number('') === 0` and `Number.isFinite(0)` is true, so without the
        // `value.trim() !== ''` guard a blank would read as a real 0 and mask a
        // missing field. It must take the FALLBACK path instead.
        const g = normalizeGroup({
            group_id: 'g1',
            member_count: '   ',
            members: { a: { id: 'a', name: 'A' } },
        } as unknown as RawSyncPlayGroup);
        // Fallback = the members length (1), not 0.
        expect(g.memberCount).toBe(1);
    });

    it('falls back for a non-numeric string', () => {
        const s = groupToSession({ group_id: 'g1', playback_position: 'abc' } as unknown as RawSyncPlayGroup);
        expect(s.playbackPosition).toBe(0);
    });

    it('falls back for NaN and Infinity, which are finite-checked not just typed', () => {
        expect(groupToSession({ group_id: 'g1', playback_position: NaN }).playbackPosition).toBe(0);
        expect(groupToSession({ group_id: 'g1', playback_position: Infinity }).playbackPosition).toBe(0);
    });
});

describe('sessionState() — the is_playing fallback', () => {
    it('a listing row with is_playing TRUE and no playback_state reads as playing', () => {
        const s = groupToSession({ id: 'g1', is_playing: true });
        expect(s.state).toBe('playing');
        expect(s.playbackRate).toBe(1);
    });

    it('a listing row with is_playing FALSE reads as waiting, at rate 0', () => {
        const s = groupToSession({ id: 'g1', is_playing: false });
        expect(s.state).toBe('waiting');
        // Rate 0 matters: `driftAmount` extrapolates `position + elapsed × rate`,
        // so a non-playing group must not drift.
        expect(s.playbackRate).toBe(0);
    });

    it('a group with NEITHER field reads as waiting', () => {
        expect(groupToSession({ id: 'g1' }).state).toBe('waiting');
    });

    it('buffering and stopped both read as waiting, not as playing', () => {
        expect(groupToSession({ id: 'g1', playback_state: 'buffering' }).state).toBe('waiting');
        expect(groupToSession({ id: 'g1', playback_state: 'stopped' }).state).toBe('waiting');
    });

    it('playback_state WINS over a contradictory is_playing', () => {
        // The explicit state is the server's authoritative field; `is_playing`
        // only exists on the reduced listing row.
        expect(groupToSession({ id: 'g1', playback_state: 'paused', is_playing: true }).state).toBe('paused');
    });
});

describe('normalizeMembers() — the dict/array split', () => {
    it('handles the `members` DICTIONARY from GroupState::getState()', () => {
        const members = normalizeMembers({
            members: {
                m1: { name: 'Alice', is_host: true, joined_at: 1_700_000_000 },
                m2: { name: 'Bob', joined_at: 1_700_000_060 },
            },
        });
        // The dict KEY supplies the id when the value omits it.
        expect(members.map((m) => m.id)).toEqual(['m1', 'm2']);
        expect(members.map((m) => m.role)).toEqual(['owner', 'contributor']);
    });

    it('handles the `[]` fallback from getRawSnapshot()', () => {
        expect(normalizeMembers({ members: [] })).toEqual([]);
    });

    it('handles an ARRAY of members', () => {
        const members = normalizeMembers({ members: [{ id: 'x', name: 'Xavier', is_host: true }] });
        expect(members).toHaveLength(1);
        expect(members[0]!.role).toBe('owner');
    });

    it('returns [] when `members` is absent entirely', () => {
        expect(normalizeMembers({ group_id: 'g1' })).toEqual([]);
        expect(normalizeMembers(undefined)).toEqual([]);
    });

    it('names an id-less, name-less member honestly rather than crashing', () => {
        const members = normalizeMembers({ members: [{}] });
        expect(members[0]!.id).toBe('');
        expect(members[0]!.name).toBe('Unknown');
        expect(members[0]!.role).toBe('contributor');
    });

    it('is_host must be exactly TRUE — a truthy string does not confer ownership', () => {
        const members = normalizeMembers({ members: [{ id: 'a', is_host: 'yes' }] } as unknown as RawSyncPlayGroup);
        expect(members[0]!.role).toBe('contributor');
    });
});

describe('normalizeGroup() — id and visibility', () => {
    it('prefers group_id over the listing row `id`', () => {
        expect(normalizeGroup({ group_id: 'from_state', id: 'from_listing' }).id).toBe('from_state');
    });

    it('falls back to `id` when group_id is absent', () => {
        expect(normalizeGroup({ id: 'from_listing' }).id).toBe('from_listing');
    });

    it('yields an EMPTY id when the group has neither — not `undefined`', () => {
        // `undefined` would go out on the wire as the literal string "undefined"
        // in `/groups/undefined/join`; '' at least produces a distinguishable
        // `/groups//join`.
        expect(normalizeGroup({}).id).toBe('');
        expect(normalizeGroup(undefined).id).toBe('');
    });

    it('has_password TRUE is the only thing that makes a room private', () => {
        expect(normalizeGroup({ id: 'g', has_password: true }).isPublic).toBe(false);
        expect(normalizeGroup({ id: 'g', has_password: false }).isPublic).toBe(true);
        expect(normalizeGroup({ id: 'g' }).isPublic).toBe(true);
    });

    it('derives memberCount from the member list when member_count is absent', () => {
        const g = normalizeGroup({ id: 'g', members: { a: { id: 'a' }, b: { id: 'b' } } });
        expect(g.memberCount).toBe(2);
    });

    it('trusts an explicit member_count over the list length', () => {
        // The dict is a snapshot; the count is the server's own figure.
        const g = normalizeGroup({ id: 'g', member_count: 9, members: { a: { id: 'a' } } });
        expect(g.memberCount).toBe(9);
    });
});

describe('isoFromUnixSeconds() — the server sends SECONDS', () => {
    it('converts unix seconds to an ISO timestamp', () => {
        // 1_700_000_000s = 2023-11-14T22:13:20Z. Reading the value as MILLIseconds
        // would produce 1970, which is the classic version of this bug.
        expect(normalizeGroup({ id: 'g', created_at: 1_700_000_000 }).createdAt).toBe('2023-11-14T22:13:20.000Z');
    });

    it('falls back to NOW for a zero/absent timestamp rather than to 1970', () => {
        const iso = normalizeGroup({ id: 'g' }).createdAt ?? '';
        expect(new Date(iso).getUTCFullYear()).toBeGreaterThan(2020);
    });
});
