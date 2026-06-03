import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { resolve } from 'node:path';

export default defineConfig({
    // unplugin-icons resolves the `~icons/lucide/*` virtual modules that Icon.vue
    // imports, compiling each to an inline Vue SFC. Only the icons actually
    // imported get bundled (tree-shaken); no runtime icon font/sprite.
    plugins: [vue(), Icons({ compiler: 'vue3', scale: 1 })],
    build: {
        // Emit fonts (and other binary assets) as separate hashed files in
        // dist/assets/ rather than base64-inlining them into style.css — keeps
        // CSS small and lets the self-hosted woff2 be cached + font-display:swap.
        assetsInlineLimit: 0,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'PhlixUi',
            formats: ['es', 'cjs'],
            fileName: (format) => `phlix-ui.${format === 'es' ? 'js' : 'umd.cjs'}`,
            // Vite 8 names lib CSS after the package ("ui.css") by default; pin it
            // to style.css to keep the published `@phlix/ui/style.css` export stable.
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['vue', 'vue-router', 'pinia'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
        sourcemap: true,
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test/setup.ts'],
        // Keep the Playwright visual specs out of the Vitest run — `e2e/visual.spec.ts`
        // matches Vitest's default `**/*.spec.ts` glob and would throw if executed
        // outside the Playwright runner. (Run them with `npm run test:visual`.)
        exclude: [...configDefaults.exclude, 'e2e/**'],
        coverage: {
            provider: 'v8',
            reporter: ['text-summary', 'text', 'html'],
            // Cover the redo surface (tokens/primitives/stores/composables/app shell)
            // plus each pre-redo surface AS it is rebuilt + tested in R2–R5 (the
            // Browse surface is done; the Player shell — Player.vue — lands in R3;
            // the auth/settings/app pages land in R4/R5).
            include: [
                'src/components/**/*.{ts,vue}',
                'src/stores/**/*.ts',
                'src/composables/**/*.ts',
                'src/api/**/*.ts',
                'src/app/**/*.{ts,vue}',
                'src/pages/BrowsePage.vue',
                'src/pages/MediaDetailPage.vue',
                'src/pages/PlayerPage.vue',
                'src/pages/LoginPage.vue',
                'src/pages/SignupPage.vue',
                'src/pages/SettingsPage.vue',
                'src/pages/LibraryScanPage.vue',
                'src/pages/MyServersPage.vue',
                'src/pages/FederationPage.vue',
                'src/pages/ManageSharesPage.vue',
                'src/pages/AuditLogsPage.vue',
                'src/pages/admin/**/*.vue',
            ],
            exclude: [
                '**/*.test.ts',
                'src/test/**',
                'src/dev/**',
                'src/app/placeholder/**',
            ],
        },
    },
});
