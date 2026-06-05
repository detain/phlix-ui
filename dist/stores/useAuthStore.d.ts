import { ApiClient, type AuthUser } from '../api/client';
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", Pick<{
    user: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
    } | null, AuthUser | {
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isLoggedIn: import("vue").ComputedRef<boolean>;
    isAdmin: import("vue").ComputedRef<boolean>;
    client: ApiClient;
    login: (identifier: string, password: string) => Promise<boolean>;
    signup: (email: string, username: string, password: string) => Promise<boolean>;
    fetchUser: () => Promise<void>;
    init: () => Promise<void>;
    logout: () => void;
}, "user" | "error" | "loading" | "client">, Pick<{
    user: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
    } | null, AuthUser | {
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isLoggedIn: import("vue").ComputedRef<boolean>;
    isAdmin: import("vue").ComputedRef<boolean>;
    client: ApiClient;
    login: (identifier: string, password: string) => Promise<boolean>;
    signup: (email: string, username: string, password: string) => Promise<boolean>;
    fetchUser: () => Promise<void>;
    init: () => Promise<void>;
    logout: () => void;
}, "isLoggedIn" | "isAdmin">, Pick<{
    user: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
    } | null, AuthUser | {
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isLoggedIn: import("vue").ComputedRef<boolean>;
    isAdmin: import("vue").ComputedRef<boolean>;
    client: ApiClient;
    login: (identifier: string, password: string) => Promise<boolean>;
    signup: (email: string, username: string, password: string) => Promise<boolean>;
    fetchUser: () => Promise<void>;
    init: () => Promise<void>;
    logout: () => void;
}, "login" | "signup" | "fetchUser" | "init" | "logout">>;
