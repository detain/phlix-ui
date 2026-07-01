import { type ComputedRef } from 'vue';
import { ApiClient, type AuthUser } from '../api/client';
export declare const useAuthStore: import("pinia").StoreDefinition<"auth", Pick<{
    user: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
        avatar_url?: string | null | undefined;
    } | null, AuthUser | {
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
        avatar_url?: string | null | undefined;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isLoggedIn: ComputedRef<boolean>;
    isAdmin: ComputedRef<boolean>;
    client: ApiClient;
    login: (identifier: string, password: string) => Promise<boolean>;
    signup: (email: string, username: string, password: string) => Promise<boolean>;
    fetchUser: () => Promise<void>;
    init: () => Promise<void>;
    logout: () => void;
    uploadAvatar: (file: File) => Promise<void>;
    deleteAvatar: () => Promise<void>;
}, "user" | "error" | "loading" | "client">, Pick<{
    user: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
        avatar_url?: string | null | undefined;
    } | null, AuthUser | {
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
        avatar_url?: string | null | undefined;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isLoggedIn: ComputedRef<boolean>;
    isAdmin: ComputedRef<boolean>;
    client: ApiClient;
    login: (identifier: string, password: string) => Promise<boolean>;
    signup: (email: string, username: string, password: string) => Promise<boolean>;
    fetchUser: () => Promise<void>;
    init: () => Promise<void>;
    logout: () => void;
    uploadAvatar: (file: File) => Promise<void>;
    deleteAvatar: () => Promise<void>;
}, "isLoggedIn" | "isAdmin">, Pick<{
    user: import("vue").Ref<{
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
        avatar_url?: string | null | undefined;
    } | null, AuthUser | {
        [x: string]: unknown;
        id: string;
        email?: string | undefined;
        username?: string | undefined;
        name?: string | undefined;
        is_admin?: boolean | undefined;
        avatar_url?: string | null | undefined;
    } | null>;
    loading: import("vue").Ref<boolean, boolean>;
    error: import("vue").Ref<string | null, string | null>;
    isLoggedIn: ComputedRef<boolean>;
    isAdmin: ComputedRef<boolean>;
    client: ApiClient;
    login: (identifier: string, password: string) => Promise<boolean>;
    signup: (email: string, username: string, password: string) => Promise<boolean>;
    fetchUser: () => Promise<void>;
    init: () => Promise<void>;
    logout: () => void;
    uploadAvatar: (file: File) => Promise<void>;
    deleteAvatar: () => Promise<void>;
}, "login" | "signup" | "fetchUser" | "init" | "logout" | "uploadAvatar" | "deleteAvatar">>;
