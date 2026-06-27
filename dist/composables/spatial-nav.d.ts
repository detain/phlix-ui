/**
 * Pure spatial-navigation geometry for the TV/remote D-pad focus engine
 * (client-unification parity). No DOM, fully deterministic — the bulk of the
 * test coverage lives against this. The impure wiring (keydown listener,
 * registry, `getBoundingClientRect`) is in `./useSpatialNav`.
 */
export type Dir = 'up' | 'down' | 'left' | 'right';
export interface Rect {
    left: number;
    top: number;
    right: number;
    bottom: number;
}
export interface Candidate {
    id: string;
    rect: Rect;
}
/** Geometric center of a rect. */
export declare function rectCenter(r: Rect): {
    x: number;
    y: number;
};
/**
 * Pick the best candidate in `dir` from `origin`, or null.
 *
 * Candidates whose center is not strictly in the half-plane of `dir` (relative
 * to the origin's center) are discarded. Among the rest, those that overlap the
 * origin on the perpendicular axis are strongly preferred (a large fixed bonus),
 * then the projection-biased distance `primaryAxisDistance + 2 * crossAxisPenalty`
 * is minimised. Ties break on smallest score, then smallest id — fully
 * deterministic.
 */
export declare function bestCandidate(origin: Rect, dir: Dir, candidates: Candidate[]): Candidate | null;
