import type { ApiClient } from '../client';
/** A log file as listed by `GET /api/v1/admin/logs`. */
export interface LogFile {
    name: string;
    size: number;
    modified_at: string;
}
/** Result of tailing one log file. */
export interface LogTail {
    file: string;
    lines: string[];
    /** True when the file had more lines than were returned. */
    truncated: boolean;
}
/** Result of tailing every log file merged into one chronological stream. */
export interface LogTailAll {
    files: string[];
    /** Merged lines, each prefixed with its source file name. */
    lines: string[];
    truncated: boolean;
}
/** Sentinel `selected` value for the combined "tail every log file" view. */
export declare const ALL_LOGS = "__all__";
/**
 * AdminLogsApi (RA.1) — typed wrapper over the admin log-viewer endpoints
 * (`/api/v1/admin/logs*`), ported from the deleted React `LogsApi`. Lists the
 * server log files and tails one (or all). Defensively unwraps the responses so
 * a malformed payload degrades to empty rather than throwing.
 */
export declare class AdminLogsApi {
    private readonly client;
    constructor(client: ApiClient);
    /** `GET /api/v1/admin/logs` → unwraps `{ files }`. */
    list(): Promise<LogFile[]>;
    /** `GET /api/v1/admin/logs/tail?file=&lines=` → `{ file, lines, truncated }`. */
    tail(file: string, lines?: number): Promise<LogTail>;
    /** `GET /api/v1/admin/logs/tail-all?lines=` → merged tail across every file. */
    tailAll(lines?: number): Promise<LogTailAll>;
}
